# JWT Expiration Error Handling & Projects Loading Fix

## Issues Fixed

### 1. JWT Expiration Error Handling
When JWT or cookie expires on production (and local env), the GraphQL endpoint returns a 500 error instead of properly handling the expired token.

### 2. Projects Not Loading on UI
Projects in database were not displayed on the frontend due to incorrect data destructuring in the TodoList component.

---

## Problem 1: JWT Expiration Error Handling

### Root Causes
1. **Backend**: JWT decode exceptions were not caught in the `ApplicationController#current_user` method, causing unhandled exceptions
2. **Backend**: GraphQL controller didn't have specific error handling for JWT-related errors
3. **Frontend**: Checked for HTTP 500 status instead of proper 401 (Unauthorized) status

### Solutions Implemented

### 1. Backend: `/react-playground/app/graphql/types/query_type.rb`
**Changes:**
- Added authorization checks in `projects` and `project` query resolvers
- Raises `GraphQL::ExecutionError` when user is not authenticated
- Returns proper error messages instead of empty data

```ruby
def projects
  raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless context[:current_user].present?
  context[:current_user].projects.ordered
end

def project(id:)
  raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless context[:current_user].present?
  context[:current_user].projects.find(id)
end
```

### 2. Backend: `/react-playground/app/controllers/application_controller.rb`
**Changes:**
- Added try-catch block in `current_user` method to gracefully handle JWT decode errors
- Returns `nil` when JWT is expired, invalid, or other decode errors occur
- This prevents 500 errors and allows the GraphQL query to execute with `current_user = nil`

```ruby
def current_user
  return if request.headers['Authorization'].blank?

  begin
    user_id = jwt_decode(request.headers['Authorization'].split.last)['user_id']
    @current_user ||= User.find(user_id)
  rescue JWT::ExpiredSignature
    nil
  rescue JWT::DecodeError
    nil
  rescue StandardError
    nil
  end
end
```

### 3. Backend: `/react-playground/app/controllers/graphql_controller.rb`
**Changes:**
- Checks for 'Unauthorized' errors in GraphQL response and returns 401
- No rescue blocks needed for JWT exceptions (they're caught in `application_controller.rb`)
- Clear error messages for client-side handling

```ruby
def execute
  variables = prepare_variables(params[:variables])
  query = params[:query]
  operation_name = params[:operationName]
  context = { current_user: current_user }
  result = ReactPlaygroundSchema.execute(query, variables: variables, context: context,
                                                operation_name: operation_name)
  
  # Check if result contains authorization errors
  result_hash = result.to_h
  if result_hash['errors']&.any? { |e| e['message']&.include?('Unauthorized') }
    render json: result_hash, status: :unauthorized
  else
    render json: result_hash
  end
rescue StandardError => e
  raise e unless Rails.env.development?
  handle_error_in_development(e)
end
```

### 4. Frontend: `/react-playground-front/src/components/todoList/services/apiSlice.ts`
**Changes:**
- Updated `baseQueryWithReauth` to check for 401 status code (standard for auth failures)
- Detects authorization errors in GraphQL error array
- Added more specific error message patterns to detect token expiration
- Clears token when 401 or token-related errors are detected

```typescript
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  // Check if the error is due to JWT expiration or authorization failure
  if (result.error) {
    const errorMessage = (result.error as any).message || '';
    const status = (result.error as any).status;
    
    // Check GraphQL error data structure for authorization errors
    const graphqlErrors = (result.error as any)?.data?.errors;
    const hasUnauthorizedError = graphqlErrors?.some((err: any) => 
      err?.message?.includes('Unauthorized')
    );

    // Handle JWT expiration errors (401 or specific messages)
    if (status === 401 ||
        hasUnauthorizedError ||
        errorMessage.includes('Signature has expired') ||
        errorMessage.includes('jwt expired') ||
        errorMessage.includes('token expired') ||
        errorMessage.includes('Token has expired') ||
        errorMessage.includes('Invalid token')) {

      // Clear the expired token
      api.dispatch(setToken(null));
    }
  }

  return result;
};
```

### 5. Frontend: `/react-playground-front/src/components/todoList/TodoList.tsx`
**Changes:**
- Fixed data destructuring to properly handle undefined state
- Enhanced error handling with two-layer protection:
  1. **useEffect hook** - Clears token when authorization errors detected
  2. **Render guard** - Immediately redirects to `/login` on 401 or Unauthorized errors
- Ensures user is redirected to login when token expires while viewing protected content

**Fixed destructuring:**
```typescript
// BEFORE (broken when data undefined):
const {
  data: { projects } = { projects: [] },
  error,
  isLoading,
} = useGetProjectsQuery(undefined, { skip: !token });

// AFTER (proper optional chaining):
const {
  data,
  error,
  isLoading,
} = useGetProjectsQuery(undefined, { skip: !token });

const projects = data?.projects || [];
```

**Enhanced error handling:**
```typescript
// useEffect to clear token and dispatch logout
React.useEffect(() => {
  if (error) {
    const status = (error as any)?.status;
    const graphqlErrors = (error as any)?.data?.errors;
    const hasUnauthorizedError = graphqlErrors?.some((err: any) => 
      err?.message?.includes('Unauthorized')
    );
    
    if (status === 401 || hasUnauthorizedError) {
      dispatch(setToken(null));
    }
  }
}, [error, dispatch]);

// Render guard for immediate redirect
if (error) {
  const status = (error as any)?.status;
  const graphqlErrors = (error as any)?.data?.errors;
  const hasUnauthorizedError = graphqlErrors?.some((err: any) => 
    err?.message?.includes('Unauthorized')
  );
  
  if (status === 401 || hasUnauthorizedError) {
    return <Navigate to="/login" />;
  }
}
```

## User Experience Flow

**Before:** User with expired token gets 500 error (poor experience)

**After:**
1. User makes GraphQL request with expired token
2. Backend returns 401 with "Unauthorized: Please log in" message
3. Frontend detects 401 status or "Unauthorized" error
4. Frontend clears token from Redux store
5. Frontend redirects user to login page
6. User logs back in with fresh credentials

## Technical Details

### Why JWT Rescue Blocks Are NOT Needed

**Flow Diagram:**
```
Expired Token Request
          ↓
ApplicationController#current_user called
          ↓
jwt_decode() throws JWT::ExpiredSignature
          ↓
Caught in ApplicationController with begin/rescue
          ↓
Returns nil (not an exception)
          ↓
GraphqlController#execute receives nil current_user
          ↓
GraphQL query executes with nil user
          ↓
Query resolver raises "Unauthorized: Please log in"
          ↓
GraphQL response contains error (not an exception)
          ↓
GraphqlController detects 'Unauthorized' in response
          ↓
Returns 401 status
```

**Result:** JWT exceptions never reach the GraphQL controller, so those rescue blocks are redundant.
Only the authorization error check is needed in the controller.

### Why This Works

1. **Backend Graceful Degradation:**
   - When JWT is expired, `current_user` now returns `nil` instead of throwing an exception
   - GraphQL queries with `current_user = nil` return authorization errors (not 500)
   - Query resolvers enforce authorization by raising explicit errors

2. **Proper HTTP Status Codes:**
   - 401 (Unauthorized) is the standard HTTP status for authentication/token failures
   - Frontend can reliably detect auth issues by checking status code
   - More compatible with HTTP clients and monitoring tools

3. **Two-Layer Frontend Protection:**
   - useEffect clears token from Redux on auth errors
   - Render guard immediately redirects before showing error page
   - Ensures smooth user experience with automatic redirect

---

## Files Modified

1. `/react-playground/app/graphql/types/query_type.rb` - Added authorization checks in query resolvers
2. `/react-playground/app/controllers/application_controller.rb` - Added JWT error handling in current_user
3. `/react-playground/app/controllers/graphql_controller.rb` - Checks for authorization errors in response
4. `/react-playground-front/src/components/todoList/services/apiSlice.ts` - Detects Unauthorized errors in GraphQL response
5. `/react-playground-front/src/components/todoList/TodoList.tsx` - Fixed data destructuring + two-layer redirect protection

## Testing Recommendations

1. **Local Testing:**
   - Use the expired token generated in rails console
   - Replace token in browser localStorage with expired token
   - Verify immediate redirect to /login page
   - Check browser console for no errors

2. **Production Monitoring:**
   - Monitor logs for "Unauthorized: Please log in" GraphQL errors
   - Watch for 401 responses in API metrics
   - Verify no 500 errors on token expiration

3. **Integration Testing:**
   - End-to-end test: login → perform action → wait for expiration → perform another action
   - Verify automatic redirect to login page (no error shown)
   - Verify token is cleared from localStorage

## Backward Compatibility

These changes are fully backward compatible:
- Existing JWT tokens continue to work
- Error handling is additive (doesn't break existing flows)
- 401 status is a standard HTTP convention
- GraphQL queries with authorized users work exactly as before

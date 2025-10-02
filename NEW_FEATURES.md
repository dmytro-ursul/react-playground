# New Features Documentation

## 🔐 Feature 1: Change Password with Strong Password Validation

### Overview
Users can now change their password with enforced strong password requirements.

### Strong Password Requirements
A strong password must include:
- ✅ **Minimum 8 characters**
- ✅ **At least one lowercase letter** (a-z)
- ✅ **At least one uppercase letter** (A-Z)
- ✅ **At least one digit** (0-9)
- ✅ **At least one special character** (@$!%*?&)

### Examples
- ✅ Valid: `Password123!`, `MySecure@Pass1`, `Test$ecure99`
- ❌ Invalid: `password` (no uppercase, no digit, no special char)
- ❌ Invalid: `Password123` (no special character)
- ❌ Invalid: `Pass1!` (too short)

### GraphQL Mutation

```graphql
mutation ChangePassword {
  changePassword(
    input: {
      currentPassword: "OldPassword123!"
      newPassword: "NewPassword456@"
      newPasswordConfirmation: "NewPassword456@"
    }
  ) {
    user {
      id
      username
      email
    }
    message
  }
}
```

### Response

**Success:**
```json
{
  "data": {
    "changePassword": {
      "user": {
        "id": "1",
        "username": "john.doe",
        "email": "john.doe@test.com"
      },
      "message": "Password changed successfully"
    }
  }
}
```

**Error (Weak Password):**
```json
{
  "errors": [
    {
      "message": "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)"
    }
  ]
}
```

**Error (Wrong Current Password):**
```json
{
  "errors": [
    {
      "message": "Current password is incorrect"
    }
  ]
}
```

**Error (Password Mismatch):**
```json
{
  "errors": [
    {
      "message": "New password and confirmation do not match"
    }
  ]
}
```

### Backend Implementation

**Model Validation (app/models/user.rb):**
```ruby
validates :password, 
  presence: true, 
  length: { minimum: 8 },
  format: {
    with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)'
  },
  if: :password_required?
```

---

## 📅 Feature 2: Task Due Date

### Overview
Tasks can now have an optional due date to help with deadline tracking.

### GraphQL Schema Updates

**TaskType (includes new field):**
```graphql
type Task {
  id: ID!
  name: String
  completed: Boolean
  position: Int
  projectId: Int!
  dueDate: ISO8601Date  # NEW FIELD
  createdAt: ISO8601DateTime!
  updatedAt: ISO8601DateTime!
}
```

### Create Task with Due Date

```graphql
mutation CreateTask {
  createTask(
    input: {
      name: "Complete project documentation"
      projectId: 1
      dueDate: "2025-10-15"
    }
  ) {
    task {
      id
      name
      dueDate
      completed
    }
  }
}
```

### Update Task Due Date

```graphql
mutation UpdateTask {
  updateTask(
    input: {
      taskInput: {
        id: 1
        dueDate: "2025-10-20"
      }
    }
  ) {
    task {
      id
      name
      dueDate
      completed
    }
  }
}
```

### Query Tasks with Due Dates

```graphql
query GetProjects {
  projects {
    id
    name
    tasks {
      id
      name
      completed
      dueDate
      position
    }
  }
}
```

### Response Example

```json
{
  "data": {
    "projects": [
      {
        "id": "1",
        "name": "Frontend Development",
        "tasks": [
          {
            "id": "1",
            "name": "Add task completion feature",
            "completed": false,
            "dueDate": "2025-10-04",
            "position": 0
          },
          {
            "id": "2",
            "name": "Update React dependencies",
            "completed": true,
            "dueDate": "2025-09-29",
            "position": 1
          }
        ]
      }
    ]
  }
}
```

### Database Schema

**Migration:**
```ruby
class AddDueDateToTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :due_date, :date
  end
end
```

**Task Model:**
- `due_date` is optional (can be `null`)
- Stored as a `date` type (no time component)
- Can be used for sorting and filtering tasks

---

## 🚀 Deployment & Testing

### Run Migrations

```bash
rails db:migrate
```

### Reset Database with New Seeds

```bash
rails db:reset
```

### New Demo Credentials

**Username:** `john.doe`  
**Password:** `Password123!`

⚠️ **Important:** The demo password has been updated to meet strong password requirements!

### Test in GraphiQL (Development)

1. Start Rails server: `rails server`
2. Open GraphiQL: `http://localhost:3000/graphiql`
3. Login first to get authentication token
4. Test the new mutations

### Example Test Flow

1. **Login:**
```graphql
mutation {
  signIn(input: { username: "john.doe", password: "Password123!" }) {
    token
    user {
      id
      username
    }
  }
}
```

2. **Change Password:**
```graphql
mutation {
  changePassword(
    input: {
      currentPassword: "Password123!"
      newPassword: "NewSecure@456"
      newPasswordConfirmation: "NewSecure@456"
    }
  ) {
    message
  }
}
```

3. **Create Task with Due Date:**
```graphql
mutation {
  createTask(
    input: {
      name: "Review pull requests"
      projectId: 1
      dueDate: "2025-10-10"
    }
  ) {
    task {
      id
      name
      dueDate
    }
  }
}
```

---

## 📝 Frontend Integration Notes

### Change Password Form

The frontend should include a form with:
- Current password field (type: password)
- New password field (type: password)
- Confirm new password field (type: password)
- Password strength indicator
- Validation messages showing requirements

### Task Due Date Picker

The frontend should include:
- Date picker component for selecting due dates
- Visual indicators for:
  - Overdue tasks (due_date < today)
  - Due soon tasks (due_date within 3 days)
  - Future tasks
- Optional: Sort/filter tasks by due date

### Date Format

- GraphQL uses ISO8601 format: `YYYY-MM-DD`
- Example: `"2025-10-15"`
- Frontend should format dates appropriately for display

---

## 🔒 Security Notes

### Password Security
- Passwords are hashed using `bcrypt` via `has_secure_password`
- Strong password validation prevents weak passwords
- Current password verification required for changes
- Password confirmation prevents typos

### Authentication
- Change password mutation requires authentication
- Uses JWT token from login
- Token must be included in Authorization header

---

## 📊 Database Updates

Run these commands after pulling the changes:

```bash
# Run migrations
rails db:migrate

# Update seeds (optional - will reset data)
rails db:seed

# Or reset everything
rails db:reset
```

---

## ✅ Testing Checklist

- [ ] Strong password validation works
- [ ] Weak passwords are rejected with clear error messages
- [ ] Password change requires correct current password
- [ ] Password confirmation must match
- [ ] Tasks can be created with due dates
- [ ] Tasks can be created without due dates (optional field)
- [ ] Due dates can be updated
- [ ] Due dates are returned in queries
- [ ] Date format is ISO8601 (YYYY-MM-DD)


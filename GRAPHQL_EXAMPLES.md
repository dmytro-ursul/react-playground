# GraphQL Examples for New Features

## 🔐 Change Password Examples

### 1. Login First (Required)

```graphql
mutation Login {
  signIn(input: {
    username: "john.doe"
    password: "Password123!"
  }) {
    token
    user {
      id
      username
      email
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "signIn": {
      "token": "eyJhbGciOiJIUzI1NiJ9...",
      "user": {
        "id": "1",
        "username": "john.doe",
        "email": "john.doe@test.com"
      }
    }
  }
}
```

**Important:** Copy the token and add it to HTTP Headers:
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

---

### 2. Change Password (Success)

```graphql
mutation ChangePassword {
  changePassword(input: {
    currentPassword: "Password123!"
    newPassword: "NewSecure@456"
    newPasswordConfirmation: "NewSecure@456"
  }) {
    user {
      id
      username
      email
    }
    message
  }
}
```

**Response:**
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

---

### 3. Change Password (Weak Password - Error)

```graphql
mutation ChangePasswordWeak {
  changePassword(input: {
    currentPassword: "Password123!"
    newPassword: "weak"
    newPasswordConfirmation: "weak"
  }) {
    user {
      id
    }
    message
  }
}
```

**Response:**
```json
{
  "errors": [
    {
      "message": "Password is too short (minimum is 8 characters), Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)",
      "locations": [{"line": 2, "column": 3}],
      "path": ["changePassword"]
    }
  ],
  "data": {
    "changePassword": null
  }
}
```

---

### 4. Change Password (Wrong Current Password)

```graphql
mutation ChangePasswordWrong {
  changePassword(input: {
    currentPassword: "WrongPassword!"
    newPassword: "NewSecure@456"
    newPasswordConfirmation: "NewSecure@456"
  }) {
    user {
      id
    }
    message
  }
}
```

**Response:**
```json
{
  "errors": [
    {
      "message": "Current password is incorrect",
      "locations": [{"line": 2, "column": 3}],
      "path": ["changePassword"]
    }
  ],
  "data": {
    "changePassword": null
  }
}
```

---

### 5. Change Password (Confirmation Mismatch)

```graphql
mutation ChangePasswordMismatch {
  changePassword(input: {
    currentPassword: "Password123!"
    newPassword: "NewSecure@456"
    newPasswordConfirmation: "DifferentPassword@789"
  }) {
    user {
      id
    }
    message
  }
}
```

**Response:**
```json
{
  "errors": [
    {
      "message": "New password and confirmation do not match",
      "locations": [{"line": 2, "column": 3}],
      "path": ["changePassword"]
    }
  ],
  "data": {
    "changePassword": null
  }
}
```

---

## 📅 Task Due Date Examples

### 1. Create Task with Due Date

```graphql
mutation CreateTaskWithDueDate {
  createTask(input: {
    name: "Complete project documentation"
    projectId: 1
    dueDate: "2025-10-15"
  }) {
    task {
      id
      name
      completed
      dueDate
      projectId
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "createTask": {
      "task": {
        "id": "9",
        "name": "Complete project documentation",
        "completed": false,
        "dueDate": "2025-10-15",
        "projectId": 1
      }
    }
  }
}
```

---

### 2. Create Task without Due Date (Optional)

```graphql
mutation CreateTaskNoDueDate {
  createTask(input: {
    name: "Brainstorm new features"
    projectId: 1
  }) {
    task {
      id
      name
      completed
      dueDate
      projectId
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "createTask": {
      "task": {
        "id": "10",
        "name": "Brainstorm new features",
        "completed": false,
        "dueDate": null,
        "projectId": 1
      }
    }
  }
}
```

---

### 3. Update Task Due Date

```graphql
mutation UpdateTaskDueDate {
  updateTask(input: {
    taskInput: {
      id: 1
      dueDate: "2025-10-20"
    }
  }) {
    task {
      id
      name
      dueDate
      completed
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "updateTask": {
      "task": {
        "id": "1",
        "name": "Add task completion feature",
        "dueDate": "2025-10-20",
        "completed": false
      }
    }
  }
}
```

---

### 4. Update Task (Remove Due Date)

```graphql
mutation RemoveTaskDueDate {
  updateTask(input: {
    taskInput: {
      id: 1
      dueDate: null
    }
  }) {
    task {
      id
      name
      dueDate
      completed
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "updateTask": {
      "task": {
        "id": "1",
        "name": "Add task completion feature",
        "dueDate": null,
        "completed": false
      }
    }
  }
}
```

---

### 5. Query All Projects with Task Due Dates

```graphql
query GetProjectsWithDueDates {
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

**Response:**
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
          },
          {
            "id": "3",
            "name": "Fix CSS styling issues",
            "completed": false,
            "dueDate": "2025-10-08",
            "position": 2
          }
        ]
      },
      {
        "id": "2",
        "name": "Backend API",
        "tasks": [
          {
            "id": "5",
            "name": "Setup GraphQL mutations",
            "completed": true,
            "dueDate": "2025-09-26",
            "position": 0
          },
          {
            "id": "6",
            "name": "Add user authentication",
            "completed": true,
            "dueDate": "2025-09-28",
            "position": 1
          }
        ]
      }
    ]
  }
}
```

---

## 🧪 Testing in GraphiQL

1. **Start Rails Server:**
   ```bash
   rails server
   ```

2. **Open GraphiQL:**
   ```
   http://localhost:3000/graphiql
   ```

3. **Login and Get Token:**
   - Run the login mutation
   - Copy the token from the response

4. **Set Authorization Header:**
   - Click "Headers" button in GraphiQL
   - Add:
     ```json
     {
       "Authorization": "Bearer YOUR_TOKEN_HERE"
     }
     ```

5. **Test Mutations:**
   - Try changing password
   - Try creating tasks with due dates
   - Test validation errors

---

## 📝 Notes

- All mutations require authentication (except `signIn`)
- Due dates use ISO8601 format: `YYYY-MM-DD`
- Due dates are optional for tasks
- Password validation is enforced on all password changes
- Strong password requirements cannot be bypassed


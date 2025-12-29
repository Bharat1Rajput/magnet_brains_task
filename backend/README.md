# Task Management System Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your configuration

3. Start MongoDB (local or use MongoDB Atlas)

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Auth Routes
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)

### Task Routes (All Protected)
- GET `/api/tasks` - Get all tasks (with pagination)
  - Query params: `page`, `limit`, `status`, `priority`, `search`
- POST `/api/tasks` - Create new task
- GET `/api/tasks/:id` - Get single task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task
- PATCH `/api/tasks/:id/status` - Update task status
- PATCH `/api/tasks/:id/priority` - Update task priority
- PATCH `/api/tasks/:id/assign` - Assign task to user

### User Routes (Admin Only)
- GET `/api/users` - Get all users
- POST `/api/users` - Create user
- GET `/api/users/:id` - Get single user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

## Testing with Postman

1. Register a user (will be regular user by default)
2. Login to get token
3. Use token in Authorization header: `Bearer YOUR_TOKEN`
4. Test all endpoints
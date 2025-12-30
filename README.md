# Magnet Brain Tasks

A simple task management application with a Node/Express + MongoDB backend and a React + Vite frontend. This README explains the project structure, environment variables, how to run the app locally, available API endpoints, and developer notes.

---

## Repository structure

- `backend/` — Node.js + Express server, Mongoose models, controllers, and routes.
- `frontend/` — React (Vite) single-page app, Tailwind CSS, components and pages.

Key files:
- Backend: [backend/server.js](backend/server.js), [backend/controllers/taskController.js](backend/controllers/taskController.js), [backend/models/task.js](backend/models/task.js)
- Frontend: [frontend/src/App.jsx](frontend/src/App.jsx), [frontend/src/pages/Dashboard.jsx](frontend/src/pages/Dashboard.jsx), [frontend/src/components/tasks/TaskForm.jsx](frontend/src/components/tasks/TaskForm.jsx)

---

## Features

- Create, update, delete tasks
- Filter and search tasks
- Task priorities (low / medium / high) and visual priority coloring
- Task status management: `pending`, `in-progress`, `completed` (toggle from UI)
- User auth (login/register) with protected routes

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB instance (local or hosted)

---

## Setup & Run

1. Clone the repo and install dependencies for each part:

```bash
# from repo root
cd backend
npm install

cd ../frontend
npm install
```

2. Configure environment variables

- Backend: create `backend/.env` with values similar to:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/magnet_brain_tasks
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

- Frontend: create `frontend/.env` (if needed) to set the backend API base URL, e.g.:

```
VITE_API_URL=http://localhost:5000/api
```

3. Start backend and frontend

```bash
# backend (in one terminal)
cd backend
npm start

# frontend (in another terminal)
cd frontend
npm run dev
```

Open the frontend URL printed by Vite (commonly `http://localhost:5173`).

---

## API Overview

Base URL: `/api` (backend serves routes under `/api`)

Important task endpoints (see `backend/routes/tasks.js` / `backend/controllers/taskController.js`):

- `GET /api/tasks` — list tasks (supports `page`, `limit`, `search`, `status`, `priority` query params)
- `POST /api/tasks` — create task (body: `title`, `description`, `dueDate`, `priority`, `assignedTo`)
- `GET /api/tasks/:id` — get single task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task
- `PATCH /api/tasks/:id/status` — update status (body: `{ status: 'pending'|'in-progress'|'completed' }`)
- `PATCH /api/tasks/:id/priority` — update priority (body: `{ priority: 'low'|'medium'|'high' }`)

Auth endpoints are under `backend/routes/auth.js` (login / register). Routes are protected by middleware in `backend/middleware/auth.js`.

---

## Frontend notes

- Components live in `frontend/src/components/` and pages in `frontend/src/pages/`.
- The dashboard shows task cards colored by priority and provides a tick button to toggle status between `pending` and `completed`.
- Task creation uses `TaskForm.jsx` which sends `dueDate` and other fields to the backend.

---

## Development tips

- Lint / type checks: add/enable tools (ESLint, Prettier) if desired.
- When changing backend models, restart the backend server.
- Use Postman or similar to exercise API endpoints during development.

---

## Contributing

1. Create a feature branch
2. Make changes and test locally (both backend & frontend)
3. Open a pull request with a clear description

---

## License

This project is provided as-is for development and learning purposes.

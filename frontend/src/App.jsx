import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './components/layout/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskDetail from './pages/TaskDetail'
import Users from './pages/Users'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />

          <Route
            path="/tasks"
            element={<PrivateRoute><Tasks /></PrivateRoute>}
          />

          <Route
            path="/tasks/:id"
            element={<PrivateRoute><TaskDetail /></PrivateRoute>}
          />

          <Route
            path="/users"
            element={<PrivateRoute adminOnly={true}><Users /></PrivateRoute>}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
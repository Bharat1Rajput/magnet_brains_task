import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { taskService } from "../services/taskService";
import { toast } from "react-toastify";
import TaskForm from "../components/tasks/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (filters.search) params.search = filters.search;
      if (filters.priority) params.priority = filters.priority;
      if (filters.status) {
        params.status =
          filters.status === "completed" ? "completed" : "pending";
      }

      const data = await taskService.getTasks(params);
      setTasks(data.data || data.tasks || []);
      setTotal(data.total || (data.meta && data.meta.total) || 0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await taskService.deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const toggleComplete = async (task) => {
    const id = task._id || task.id;
    const isDone = task.status === "completed";
    const newStatus = isDone ? "pending" : "completed";
    try {
      await taskService.updateTaskStatus(id, newStatus);
      toast.success("Task status updated");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    }
  };

  const openCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const onFormSaved = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            value={filters.search}
            onChange={(e) =>
              setFilters((s) => ({ ...s, search: e.target.value }))
            }
            placeholder="Search tasks..."
            className="border p-2 rounded w-64"
          />

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((s) => ({ ...s, status: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters((s) => ({ ...s, priority: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={() => {
              setPage(1);
              fetchTasks();
            }}
            className="bg-gray-200 px-3 py-2 rounded"
          >
            Apply
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="p-6 bg-white rounded shadow">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="p-6 bg-white rounded shadow">No tasks found</div>
        ) : (
          tasks.map((t) => {
            const priority = (t.priority || "low").toLowerCase();
            const cardBg =
              priority === "high"
                ? "bg-red-50 border-red-200"
                : priority === "medium"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200";
            const accentBorder = "border-l-4";

            return (
              <div
                key={t._id || t.id}
                className={`p-4 rounded shadow ${cardBg} ${accentBorder}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleComplete(t)}
                      title={
                        t.status === "completed"
                          ? "Mark as pending"
                          : "Mark as completed"
                      }
                      className={`p-2 rounded-full border ${
                        t.status === "completed"
                          ? "bg-green-600 text-white border-green-700"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill={
                          t.status === "completed" ? "currentColor" : "none"
                        }
                        aria-hidden="true"
                      >
                        {t.status === "completed" ? (
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke="currentColor"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        )}
                      </svg>
                    </button>

                    <div>
                      <Link
                        to={`/tasks/${t._id || t.id}`}
                        className="text-lg font-medium text-gray-800 hover:underline"
                      >
                        {t.title}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {t.description?.slice(0, 120)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="mb-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          priority === "high"
                            ? "bg-red-600"
                            : priority === "medium"
                            ? "bg-yellow-500 text-black"
                            : "bg-green-600"
                        }`}
                      >
                        {priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(t._id || t.id)}
                        className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          <label className="mr-2">Per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border p-1 rounded"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSaved={onFormSaved}
        />
      )}
    </div>
  );
};

export default Dashboard;

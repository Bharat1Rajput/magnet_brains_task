import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import { toast } from 'react-toastify';

const TaskForm = ({ task, onClose, onSaved }) => {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ title: '', description: '', priority: 'low', status: 'pending', dueDate: today });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'low',
        status: task.status || 'pending',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : (task.dueDate || today),
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (task && (task._id || task.id)) {
        await taskService.updateTask(task._id || task.id, form);
        toast.success('Task updated');
      } else {
        const createPayload = {
          title: form.title,
          description: form.description,
          priority: form.priority,
        };
        if (form.dueDate) createPayload.dueDate = form.dueDate;

        await taskService.createTask(createPayload);
        toast.success('Task created');
      }
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{task ? 'Edit Task' : 'Create Task'}</h2>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="mt-1 block w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="mt-1 block w-full border rounded p-2"></textarea>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="mt-1 block border rounded p-2">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {task && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="mt-1 block border rounded p-2">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate || ''} onChange={handleChange} required className="mt-1 block w-full border rounded p-2" />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

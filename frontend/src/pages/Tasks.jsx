import React from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
  // Placeholder - later integrate taskService
  const sample = [
    { id: '1', title: 'Sample Task 1' },
    { id: '2', title: 'Sample Task 2' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link to="/tasks/new" className="text-sm text-blue-600">+ New Task</Link>
      </div>

      <ul className="space-y-2">
        {sample.map((t) => (
          <li key={t.id} className="p-3 border rounded hover:bg-gray-50">
            <Link to={`/tasks/${t.id}`} className="font-medium text-gray-800">{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

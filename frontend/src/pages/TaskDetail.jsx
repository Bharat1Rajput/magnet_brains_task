import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
      <p className="text-gray-700">Showing details for task ID: {id}</p>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
        <button className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
};

export default TaskDetail;

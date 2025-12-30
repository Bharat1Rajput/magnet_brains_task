import React from 'react';

const Users = () => {
  // Placeholder - will use userService
  const sample = [
    { id: 'u1', name: 'Alice' },
    { id: 'u2', name: 'Bob' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {sample.map((u) => (
          <li key={u.id} className="p-3 border rounded">{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

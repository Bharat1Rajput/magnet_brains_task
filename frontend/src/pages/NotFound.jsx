import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6">Page not found</p>
        <Link to="/dashboard" className="text-blue-600">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;

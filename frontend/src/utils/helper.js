import { format, parseISO, isAfter, isBefore, isToday } from 'date-fns';

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), 'MMM dd, yyyy');
  } catch (error) {
    return date;
  }
};

// Format date for input
export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), 'yyyy-MM-dd');
  } catch (error) {
    return date;
  }
};

// Check if task is overdue
export const isOverdue = (dueDate, status) => {
  if (status === 'completed') return false;
  try {
    const due = parseISO(dueDate);
    return isBefore(due, new Date()) && !isToday(due);
  } catch (error) {
    return false;
  }
};

// Get priority color
export const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  return colors[priority] || colors.medium;
};

// Get priority text color
export const getPriorityTextColor = (priority) => {
  const colors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  };
  return colors[priority] || colors.medium;
};

// Get priority background color (light)
export const getPriorityBgColor = (priority) => {
  const colors = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-green-50 border-green-200',
  };
  return colors[priority] || colors.medium;
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500',
  };
  return colors[status] || colors.pending;
};

// Get status badge color
export const getStatusBadgeColor = (status) => {
  const colors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };
  return colors[status] || colors.pending;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
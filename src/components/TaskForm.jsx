import React from 'react';

const TaskForm = ({ newTask, setNewTask, addTask }) => {
  return (
    <div className="flex items-center space-x-4 mb-6 animate-fade-in-down">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out flex-1 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
      />
      <button
        onClick={addTask}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
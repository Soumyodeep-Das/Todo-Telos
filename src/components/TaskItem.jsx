const TaskItem = ({ task, index, completeTask, deleteTask }) => {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-3 border-l-4 border-transparent hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
      <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}>
        {task.task}  {/* task.description is now accessed correctly */}
      </span>
      <div className="space-x-3">
        <button
          onClick={() => completeTask(index)}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Complete
        </button>
        <button
          onClick={() => deleteTask(index)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Delete
        </button>
      </div>
    </li>
  );
};


export default TaskItem;
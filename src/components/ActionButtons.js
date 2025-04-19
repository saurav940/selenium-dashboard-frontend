const ActionButtons = ({ 
    onStart, 
    onStop, 
    isStartDisabled 
  }) => {
    return (
      <div className="flex space-x-4 mb-6">
        <button
          onClick={onStart}
          disabled={isStartDisabled}
          className={`px-6 py-2 rounded-md font-medium ${
            !isStartDisabled
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Test
        </button>
        <button
          onClick={onStop}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
        >
          Stop Test
        </button>
      </div>
    );
  };
  
  export default ActionButtons;
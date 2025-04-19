const StatusIndicator = ({ loading, error }) => {
    return (
      <div className="space-y-2 mb-6">
        {loading && (
          <div className="flex items-center text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Loading...
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}
      </div>
    );
  };
  
  export default StatusIndicator;
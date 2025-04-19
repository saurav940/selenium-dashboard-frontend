const TestLogs = ({ logs }) => {
    return (
      <div className="border-t pt-4">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Test Logs:</h2>
        <div className="bg-gray-50 p-4 rounded-md h-48 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet</p>
          ) : (
            <ul className="space-y-1">
              {logs.map((log, index) => (
                <li key={index} className="text-sm font-mono">
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  export default TestLogs;
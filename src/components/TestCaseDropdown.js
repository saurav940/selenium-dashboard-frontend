const formatTestCaseName = (className, methodName) => {
    // Extract class name
    const simpleClass = className.split('.').pop();
  
    // Remove suffix like _TC or TC if needed
    const cleanClass = simpleClass.replace(/_?TC$/, '');
  
    // Replace underscores and dots with space, capitalize each word
    const formatted = cleanClass
      .replace(/[_\.]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    return formatted;
  };
  
  const TestCaseDropdown = ({ testCases, selectedTestCase, loading, onChange }) => {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Test Case Name:
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={selectedTestCase}
          onChange={onChange}
          disabled={loading}
        >
          <option value="">-- Select Test Case --</option>
          {testCases.map((tc) => (
            <option key={`${tc.className}-${tc.methodName}`} value={tc.methodName}>
              {formatTestCaseName(tc.className, tc.methodName)}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default TestCaseDropdown;
  
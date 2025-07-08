const formatTestCaseName = (className) => {
  // Extract class name
  const simpleClass = className.split('.').pop();

  // Remove suffix like _TC or TC
  const cleanClass = simpleClass.replace(/_?TC$/, ''); // Fixed regex

  // Replace underscores/dots with spaces, capitalize words
  const formatted = cleanClass
    .replace(/[_.]/g, ' ') // Fixed regex
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
          <option key={tc.className} value={tc.className}>
            {formatTestCaseName(tc.className)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TestCaseDropdown;
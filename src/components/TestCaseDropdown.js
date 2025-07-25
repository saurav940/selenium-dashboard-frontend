import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// Helper to format class name like com.module.Test_TC => Test
const formatTestCaseName = (className) => {
  const simpleClass = className?.split('.').pop() || '';
  const cleanClass = simpleClass.replace(/_?TC$/, ''); // remove _TC or TC
  return cleanClass
    .replace(/[_.]/g, ' ')                          // replace _ or . with space
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // capitalize
    .join(' ');
};

const TestCaseDropdown = ({
  testCases = [],
  selectedTestCases = [],
  loading = false,
  onChange,
}) => {
  // Convert testCases to options for react-select
  const options = testCases
    .filter(tc => tc?.className)
    .map(tc => ({
      label: formatTestCaseName(tc.className),
      value: tc.className,
    }));

  // Set selected options based on selectedTestCases
  const selectedOptions = options.filter(opt =>
    Array.isArray(selectedTestCases) && selectedTestCases.includes(opt.value)
  );

  const handleChange = (selected) => {
    const safeSelected = Array.isArray(selected) ? selected : [];
    const selectedValues = safeSelected
      .filter(opt => opt?.value)
      .map(opt => opt.value);

    onChange(selectedValues);
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">
        Test Case Name(s):
      </label>
      <Select
        isMulti
        isDisabled={loading}
        isClearable={false}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="-- Select Test Case(s) --"
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

TestCaseDropdown.propTypes = {
  testCases: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTestCases: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default TestCaseDropdown;

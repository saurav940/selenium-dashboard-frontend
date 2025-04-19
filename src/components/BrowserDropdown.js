const BrowserDropdown = ({ selectedBrowser, onChange }) => {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Browser:
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={selectedBrowser}
          onChange={onChange}
        >
          <option value="chrome">Chrome</option>
          <option value="firefox">Firefox</option>
          <option value="edge">Microsoft Edge</option>
        </select>
      </div>
    );
  };
  
  export default BrowserDropdown;
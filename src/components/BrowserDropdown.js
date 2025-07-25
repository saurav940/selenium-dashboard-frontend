import React, { useEffect, useState } from "react";

const BrowserDropdown = ({ selectedProject, selectedBrowser, onChange }) => {
  const [browserList, setBrowserList] = useState([]);

  useEffect(() => {
    if (selectedProject) {
      fetch(`http://localhost:8080/api/browser?project=${selectedProject}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🌐 API Response:", data); // ✅ DEBUG: check response
          if (Array.isArray(data)) {
            setBrowserList(data);
          } else {
            setBrowserList([]);
          }
        })
        .catch((err) => {
          console.error("❌ Failed to fetch browser:", err);
          setBrowserList([]);
        });
    } else {
      setBrowserList([]);
    }
  }, [selectedProject]);

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">Browser:</label>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        value={selectedBrowser}
        onChange={onChange}
      >
        <option value="">-- Select Browser --</option>
        {browserList.map((browser, index) => (
          <option key={index} value={browser}>
            {browser}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrowserDropdown;

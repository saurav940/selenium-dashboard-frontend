import React, { useEffect, useState } from "react";

const BrowserDropdown = ({ selectedBrowser, onChange }) => {
  const [browserOptions, setBrowserOptions] = useState([]);

  useEffect(() => {
    const fetchBrowser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/browser");
        const browser = await response.text(); // ✅ plain string
        setBrowserOptions([browser]); // ✅ wrap as array
      } catch (error) {
        console.error("Error fetching browser:", error);
      }
    };

    fetchBrowser();
  }, []);

  return (
    <div>
      <label htmlFor="browser">Browser:</label>
      <select id="browser" value={selectedBrowser} onChange={onChange}>
        <option value="">Select Browser</option>
        {browserOptions.map((browser, index) => (
          <option key={index} value={browser.toLowerCase()}>
            {browser}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrowserDropdown;

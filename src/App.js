import React, { useState, useEffect } from 'react';
import { fetchProjects, fetchTestCases } from './services/api';
import ProjectDropdown from './components/ProjectDropdown';
import TestCaseDropdown from './components/TestCaseDropdown';
import BrowserDropdown from './components/BrowserDropdown';
import ActionButtons from './components/ActionButtons';
import TestLogs from './components/TestLogs';
import StatusIndicator from './components/StatusIndicator';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState("");
  const [selectedBrowser, setSelectedBrowser] = useState("chrome");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [error, setError] = useState("");

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
        setLogs(prev => [...prev, `✅ Loaded ${data.length} projects.`]);
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoadingProjects(false);
      }
    };
    loadProjects();
  }, []);

  // Load test cases when project changes
  useEffect(() => {
    if (!selectedProject) {
      setTestCases([]);
      setSelectedTestCase("");
      return;
    }

    setLoading(true);
    setError("");
    setLogs(prev => [...prev, `🔄 Loading test cases for "${selectedProject}"...`]);

    fetchTestCases(selectedProject)
      .then(data => {
        setTestCases(data);
        setLogs(prev => [...prev, `✅ Found ${data.length} test cases.`]);
      })
      .catch(err => {
        const msg = err.message || "Failed to load test cases";
        setError(msg);
        setLogs(prev => [...prev, `❌ Error: ${msg}`]);
      })
      .finally(() => setLoading(false));
  }, [selectedProject]);

  const handleStartTest = async () => {
    if (!selectedTestCase) {
      setError("⚠️ Please select a test case.");
      return;
    }

    setLogs(prev => [
      ...prev,
      `🚀 Starting test: "${selectedTestCase}"`,
      `🧪 Browser: ${selectedBrowser}`,
      "⏳ Test execution started..."
    ]);

    try {
      const response = await fetch('http://localhost:8080/api/start-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: selectedProject,
          testCase: selectedTestCase,
          browser: selectedBrowser,
        }),
      });

      const result = await response.text();
      setLogs(prev => [...prev, `✅ Test started: ${result}`]);
    } catch (err) {
      setLogs(prev => [...prev, `❌ Failed to start test: ${err.message}`]);
    }
  };

  const handleStopTest = () => {
    setLogs(prev => [...prev, "🛑 Test stopped by user."]);
    // Add backend stop logic here if needed
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Capital Small Finance Bank Test Dashboard
          </h1>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Project Dropdown */}
          <ProjectDropdown
            projects={projects}
            selectedProject={selectedProject}
            loading={loadingProjects}
            onChange={(e) => setSelectedProject(e.target.value)}
          />

          {/* Test Case Dropdown */}
          <TestCaseDropdown
            testCases={testCases}
            selectedTestCase={selectedTestCase}
            loading={loading}
            onChange={(e) => setSelectedTestCase(e.target.value)}
          />

          {/* Browser Dropdown */}
          <BrowserDropdown
            selectedBrowser={selectedBrowser}
            onChange={(e) => setSelectedBrowser(e.target.value)}
          />

          {/* Status & Error Messages */}
          <StatusIndicator loading={loading} error={error} />

          {/* Start / Stop Buttons */}
          <ActionButtons
            onStart={handleStartTest}
            onStop={handleStopTest}
            isStartDisabled={!selectedTestCase || loading}
            selectedBrowser={selectedBrowser}
          />

          {/* Logs */}
          <TestLogs logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default App;

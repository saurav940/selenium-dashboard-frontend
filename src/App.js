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

  // Load projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
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
    setLogs(prev => [...prev, `Loading test cases for ${selectedProject}...`]);

    fetchTestCases(selectedProject)
      .then(data => {
        setTestCases(data);
        setLogs(prev => [...prev, `Found ${data.length} test cases`]);
      })
      .catch(err => {
        setError(err.message || "Failed to load test cases");
        setLogs(prev => [...prev, `Error: ${err.message}`]);
      })
      .finally(() => setLoading(false));
  }, [selectedProject]);

  const handleStartTest = () => {
    if (!selectedTestCase) {
      setError("Please select a test case");
      return;
    }
    setLogs(prev => [
      ...prev,
      `Starting test: ${selectedTestCase}`,
      `Using browser: ${selectedBrowser}`,
      "Test execution started..."
    ]);
    // Add test execution logic here
  };

  const handleStopTest = () => {
    setLogs(prev => [...prev, "Test stopped by user"]);
    // Add test stop logic here
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
          <ProjectDropdown
            projects={projects}
            selectedProject={selectedProject}
            loading={loadingProjects}
            onChange={(e) => setSelectedProject(e.target.value)}
          />

          <TestCaseDropdown
            testCases={testCases}
            selectedTestCase={selectedTestCase}
            loading={loading}
            onChange={(e) => setSelectedTestCase(e.target.value)}
          />

          <BrowserDropdown
            selectedBrowser={selectedBrowser}
            onChange={(e) => setSelectedBrowser(e.target.value)}
          />

          <StatusIndicator loading={loading} error={error} />

          <ActionButtons
            onStart={handleStartTest}
            onStop={handleStopTest}
            isStartDisabled={!selectedTestCase || loading}
          />

          <TestLogs logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default App;
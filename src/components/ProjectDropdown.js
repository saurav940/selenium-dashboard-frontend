const ProjectDropdown = ({ projects, selectedProject, loading, onChange }) => {
  // Mapping of value to display label
  const projectLabels = {
    CapBankQA: 'Internet Banking',
    'CSFB.online_Re_KYC': ' Online Rekyc',
    AOO_Assisted_Module: ' Assisted Module',
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        Project Name:
      </label>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={selectedProject}
        onChange={onChange}
        disabled={loading}
      >
        <option value="">-- Select Project --</option>
        {projects.map((project) => (
          <option key={project} value={project}>
            {projectLabels[project] || project}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectDropdown;

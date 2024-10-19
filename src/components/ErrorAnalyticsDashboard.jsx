import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data for the charts
const projectData = {
  ProjectA: [
    { title: "Total Errors Detected", value: 300, icon: "⚠️", color: "#6b7280" },
    { title: "Critical Errors", value: 50, icon: "🔴", color: "#ef4444" },
    { title: "Non-Critical Errors", value: 100, icon: "🟠", color: "#f97316" },
    { title: "Warnings", value: 150, icon: "🟡", color: "#eab308" },
    { title: "Resolved Errors", value: 200, icon: "✅", color: "#22c55e" },
    { title: "Pending Errors", value: 50, icon: "⏳", color: "#3b82f6" },
  ],
  ProjectB: [
    { title: "Total Errors Detected", value: 950, icon: "⚠️", color: "#6b7280" },
    { title: "Critical Errors", value: 100, icon: "🔴", color: "#ef4444" },
    { title: "Non-Critical Errors", value: 200, icon: "🟠", color: "#f97316" },
    { title: "Warnings", value: 350, icon: "🟡", color: "#eab308" },
    { title: "Resolved Errors", value: 750, icon: "✅", color: "#22c55e" },
    { title: "Pending Errors", value: 150, icon: "⏳", color: "#3b82f6" },
  ],
  // Add more projects as needed
};

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE"];

const ErrorAnalyticsDashboard = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const [selectedProject, setSelectedProject] = useState("ProjectA");
  const [overviewData, setOverviewData] = useState(projectData[selectedProject]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    document.documentElement.setAttribute('data-theme', theme);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const navigate = useNavigate();

  const backbuttonfunction = () => {
    navigate('/error-dashboard'); // Navigate to error dashboard
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleProjectChange = (event) => {
    const newProject = event.target.value;
    setSelectedProject(newProject);
    setOverviewData(projectData[newProject]);
  };

  const styles = {
    backButton: {
      padding: '10px 15px',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
    },
  };

  return (
    <div className="dashboard">
    <div className="header">
      <button style={styles.backButton} onClick={backbuttonfunction}>
        <ArrowLeft size={20} style={{ marginRight: '5px' }} />
        Back
      </button>
      
      <h1>Error Analytics Dashboard</h1>
      
      <button onClick={toggleTheme} className="theme-toggle">
        {/* Assuming theme is being handled in your state */}
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>

      <div className="project-selector">
        <label htmlFor="project-select">Select Project: </label>
        <select id="project-select" value={selectedProject} onChange={handleProjectChange}>
          {Object.keys(projectData).map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div className="overview-section">
        {overviewData.map((item) => (
          <div
            key={item.title}
            className="overview-card"
            style={{ backgroundColor: item.color }}
          >
            <div className="overview-card-header">
              <h3>{item.title}</h3>
              <span className="icon">{item.icon}</span>
            </div>
            <div className="overview-card-content">
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart Section */}
      <h2>Errors Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={overviewData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart Section */}
      <h2>Error Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={overviewData}
            dataKey="value"
            nameKey="title"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {overviewData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        /* CSS Custom Properties for Theming */
        :root {
          --background-primary: #ffffff;
          --background-secondary: #f8f9fa;
          --text-primary: #333333;
          --text-secondary: #666666;
          --border-color: #e0e0e0;
          --shadow-color: rgba(0, 0, 0, 0.1);
        }

        /* Dark theme variables */
        [data-theme="dark"] {
          --background-primary: #1a1a1a;
          --background-secondary: #2d2d2d;
          --text-primary: #ffffff;
          --text-secondary: #cccccc;
          --border-color: #444444;
          --shadow-color: rgba(0, 0, 0, 0.3);
        }

        /* Global styles */
        body {
          margin: 0;
          padding: 0;
          background-color: var(--background-primary);
          color: var(--text-primary);
          font-family: Arial, sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .dashboard {
        font-family: 'Poppins', sans-serif; 
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 24px;
          margin: 0;
        }

        .theme-toggle {
          padding: 8px 16px;
          background-color: var(--background-secondary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background-color: var(--border-color);
        }

        .project-selector {
          margin-bottom: 20px;
        }

        .project-selector select {
          width:30%;
          background-color:white;
          font-size:10px;
          padding: 8px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          margin-left: 10px;
        }

        .overview-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .overview-card {
          padding: 15px;
          border-radius: 8px;
          color: white;
          box-shadow: 0 2px 4px var(--shadow-color);
        }

        .overview-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .overview-card-header h3 {
          font-size: 14px;
          margin: 0;
        }

        .icon {
          font-size: 20px;
        }

        .overview-card-content p {
          font-size: 24px;
          margin: 0;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .overview-card-content p {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorAnalyticsDashboard;

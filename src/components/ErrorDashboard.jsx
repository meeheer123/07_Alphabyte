import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function ErrorDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Mock data for critical errors
  const criticalErrors = [
    { id: 1, description: "Server overload on 10/15/2024", severity: "Critical" },
    { id: 2, description: "Database connection failure on 10/16/2024", severity: "Critical" },
  ];

  // Mock data for system status
  const systemStatus = {
    uptime: "99.9%",
    totalErrors: 150,
    resolvedErrors: 145,
  };

  // Function to handle "View Error Log" button click
  const handleViewErrorLog = () => {
    navigate('/error-classification-dashboard'); // Redirect to error classification dashboard
  };

  // Function to handle "Go to Analytics Dashboard" button click
  const handleAnalyticsDashboard = () => {
    navigate('/error-analytics-dashboard'); // Redirect to error analytics dashboard
  };

  const handleAISolver = () => {
    navigate('/ai-solver'); // This will navigate to the AI Solver page
  };

  return (
    <div className="error-dashboard">
      <header>
        <h1>Welcome, Harshad Karale</h1>
        <button className="notification-bell">
          🔔
          <span className="notification-count">{criticalErrors.length}</span>
        </button>
      </header>

      <main>
        <div className="critical-errors">
          <h2>Critical Errors Detected</h2>
          <p>{criticalErrors.length} critical errors require immediate attention</p>
          <ul>
            {criticalErrors.map((error) => (
              <li key={error.id}>
                <div>
                  <span className="error-icon">⚠️</span>
                  <div>
                    <p>{error.description}</p>
                    <p>Severity: {error.severity}</p>
                  </div>
                </div>
              </li>
            ))} 
          </ul>
        </div>

        <div className="navigation-buttons">
          <button onClick={handleViewErrorLog}>
            <span className="icon">📁</span>
            <div>
              <h3>View Error Log</h3>
              <p>Browse all logged errors</p>
            </div>
          </button>

          <button onClick={handleAnalyticsDashboard}>
            <span className="icon">📊</span>
            <div>
              <h3>Go to Analytics Dashboard</h3>
              <p>View error analytics and trends</p>
            </div>
          </button>

          {/* New button for AI Solver */}
          <button onClick={handleAISolver}>
            <span className="icon">🤖</span>
            <div>
              <h3>AI Solver</h3>
              <p>Use AI to solve errors</p>
            </div>
          </button>
        </div>

        <div className="system-status">
          <h2>System Status Summary</h2>
          <div className="status-grid">
            <div>
              <span className="icon">🕒</span>
              <div>
                <p>System Uptime</p>
                <p className="status-value">{systemStatus.uptime}</p>
              </div>
            </div>
            <div>
              <span className="icon">⚠️</span>
              <div>
                <p>Total Errors Logged</p>
                <p className="status-value">{systemStatus.totalErrors}</p>
              </div>
            </div>
            <div>
              <span className="icon">✅</span>
              <div>
                <p>Resolved Errors</p>
                <p className="status-value">{systemStatus.resolvedErrors}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

      html {
        font-size: 20px; /* Base font size remains increased */
      }

      .error-dashboard {
        font-family: 'Poppins', sans-serif;
        max-width: 1400px; /* Increased max-width */
        margin: 0 auto;
        padding: 20px;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      h1 {
        font-size: 36px; /* Increased font size */
        color: #333;
      }

      .notification-bell {
        position: relative;
        background: none;
        border: none;
        font-size: 36px; /* Increased icon size for the bell */
        cursor: pointer;
      }

      .notification-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 4px 8px;
        font-size: 16px; /* Notification count size */
      }

      .critical-errors {
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-left: 4px solid #ff4d4f;
        padding: 30px; /* Increased padding */
        margin-bottom: 20px;
      }

      .critical-errors h2 {
        font-size: 32px; /* Increased font size */
        color: #ff4d4f;
        margin-top: 0;
      }

      .critical-errors p {
        font-size: 20px; /* Increased font size */
      }

      .critical-errors ul {
        list-style-type: none;
        padding: 0;
      }

      .critical-errors li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-size: 20px; /* Increased font size */
      }

      .critical-errors .error-icon {
        font-size: 36px; /* Increased size of the error icon */
        margin-right: 10px;
      }

      .navigation-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }

      .navigation-buttons button {
        font-family: 'Poppins', sans-serif;
        font-size: 18px; /* Button text size */
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 24px; /* Increased padding */
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        cursor: pointer;
        text-align: left;
      }

      .navigation-buttons button:hover {
        background-color: #e1e1e1;
        box-shadow: 1px 1px 1px #e1e1e1;
      }

      .navigation-buttons .icon {
        font-size: 36px; /* Increased icon size */
        margin-right: 12px;
      }

      .system-status {
        background-color: #fff;
        border: 1px solid #e0e0e0;
        padding: 30px; /* Increased padding */
        margin-bottom: 20px;
      }

      .status-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }

      .status-grid > div {
        display: flex;
        align-items: center;
        font-size: 20px; /* Status text font size */
      }

      .status-grid .icon {
        font-size: 36px; /* Increased size of icons for the status summary */
        margin-right: 10px;
      }

      .status-value {
        font-size: 32px; /* Increased value size */
        font-weight: bold;
      }

      @media (max-width: 768px) {
        .navigation-buttons,
        .status-grid,
        footer {
          grid-template-columns: 1fr;
        }
      }
      `}</style>
    </div>
  );
}

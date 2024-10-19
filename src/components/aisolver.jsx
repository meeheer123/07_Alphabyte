import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';

// Load the Poppins font using a link tag
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const AISolver = () => {
  const [error, setError] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const [darkMode, setDarkMode] = useState(false);

  const handleSolveError = async () => {
    setLoading(true); // Start loader
    try {
      const response = await fetch('https://ac08-210-212-183-60.ngrok-free.app/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error_message: error, // Pass the error message input to the API
        }),
      });

      const result = await response.json();
      console.log(result); // Print the output to the console
      setOutput(result); // Set the output from the API
    } catch (err) {
      console.error('Error fetching the API:', err);
    }
    setLoading(false); // Stop loader when result is ready
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`ai-solver ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="header">
          <button className="back-button" onClick={() => window.history.back()}>
            <ArrowLeft size={20} style={{ marginRight: '5px' }} /> Back
          </button>
          <h1>AI Error classifier</h1>
          <button className="dark-mode-toggle" onClick={handleToggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="form-container">
          <div className="form-group">
            <label htmlFor="error">Error Message</label>
            <textarea
              id="error"
              value={error}
              onChange={(e) => setError(e.target.value)}
              placeholder="Paste your error message here"
              style={{ height: '200px', fontFamily: 'Poppins', fontSize: '14px' }} // Increase height and change font style
            />
          </div>
          <button onClick={handleSolveError} className="solve-button">
            Solve Error
          </button>
        </div>

        {/* Show loader when loading */}
        {loading && <div className="loader">Loading...</div>}

        {/* Show result when loading is done */}
        {!loading && output && (
          <div className="output-card">
            <h2>AI Analysis Result</h2>
            <div className="output-content">
              <div className="result-group">
                <h3>Classification</h3>
                <div className="result-card">
                  <p>{output.aiAnalysis?.classification || 'N/A'}</p>
                </div>
              </div>
              <div className="result-group">
                <h3>Severity</h3>
                <div className="result-card">
                  <p>{output.aiAnalysis?.severity || 'N/A'}</p>
                </div>
              </div>
              <div className="result-group">
                <h3>Core Issue</h3>
                <div className="result-card">
                  <p>{output.aiAnalysis?.analysis?.coreIssue || 'N/A'}</p>
                </div>
              </div>
              <div className="result-group">
                <h3>Likely Cause</h3>
                <div className="result-card">
                  <ul>
                    {output.aiAnalysis?.likelyCause?.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    )) || 'N/A'}
                  </ul>
                </div>
              </div>
              <div className="result-group">
                <h3>Suggested Solution</h3>
                <div className="result-card">
                  <ul>
                    {output.aiAnalysis?.suggestedSolution?.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    )) || 'N/A'}
                  </ul>
                </div>
              </div>
              <div className="result-group">
                <h3>Tips</h3>
                <div className="result-card">
                  <ul>
                    {output.aiAnalysis?.tips?.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    )) || 'N/A'}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-solver {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${darkMode ? '#000000' : '#ffffff'};
          color: ${darkMode ? '#ffffff' : '#000000'};
          font-family: 'Poppins', sans-serif;
        }

        .container {
          background: ${darkMode ? 'rgba(51, 51, 51, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 40px;
          width: 95%;
          min-height: 10vh;
          margin-top: 10px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: ${darkMode ? '#333333' : '#f9f9f9'};
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        h1 {
          color: ${darkMode ? '#fff' : '#000'};
          font-size: 24px;
          margin: 0;
        }

        .back-button {
          background: none;
          border: none;
          color: ${darkMode ? '#ffffff' : '#000000'};
          font-size: 18px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .dark-mode-toggle {
          background: none;
          border: none;
          color: ${darkMode ? '#ffffff' : '#000000'};
          font-size: 20px;
          cursor: pointer;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex-grow: 1;
          background-color: ${darkMode ? '#333333' : '#f9f9f9'};
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 5px;
          font-weight: bold;
          color: ${darkMode ? '#ffffff' : '#333'};
        }

        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid ${darkMode ? '#ffffff' : '#333'};
          border-radius: 8px;
          font-size: 14px;
          background-color: rgba(255, 255, 255, 0.7);
          resize: none;
          transition: border-color 0.3s ease;
          height: 200px; /* Set the height for the textarea */
        }

        textarea:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.5);
        }

        .solve-button {
          background: rgba(18, 7, 238, 0.89);
          color: white;
          border: none;
          padding: 12px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .solve-button:hover {
          transform: translateY(-2px);
        }

        .output-card {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(216, 234, 246, 0.5)'};
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.5)' : '#87CEFA'};
          border-radius: 16px;
          padding: 20px;
          margin-top: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: ${darkMode ? '#ffffff' : '#333'};
        }

        .output-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .result-group h3 {
          color: ${darkMode ? '#87CEFA' : '#000'};
          margin-bottom: 5px;
        }

        .result-card {
          background-color: ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(172, 223, 254, 0.3)'};
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.3)' : '#87CEFA'};
        }

        .loader {
          margin-top: 20px;
          font-size: 18px;
          color: ${darkMode ? '#ffffff' : '#333'};
        }

        @media (max-width: 600px) {
          .ai-solver {
            padding: 10px;
          }

          h1 {
            font-size: 20px;
          }

          textarea {
            font-size: 12px;
          }

          .solve-button {
            font-size: 14px;
            padding: 10px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default AISolver;

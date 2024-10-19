import React, { useState } from 'react';

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loginError, setLoginError] = useState('');

  const topCompanies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
    { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
    { name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com' },
    { name: 'Tietoevry Banking', logo: 'https://logo.clearbit.com/tietoevry.com' },
  ];

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = password.length > 8 ? (password.match(/[A-Z]/) ? (password.match(/[0-9]/) ? 3 : 2) : 1) : 0;
    setPasswordStrength(strength);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'harshad@gmail.com' && password === 'Harshad@45') {
      // Show the prompt for login success
      alert('Login successful for company: ' + e.target.company.value);

      // Redirect to the error-dashboard after user clicks "OK" in the alert
      window.location.href = 'http://localhost:5173/error-dashboard';
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup successful for company: ' + e.target.company.value);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body{
         font-family: 'Poppins', sans-serif; 
           margin:0;
            padding:0;
        }
          .container {
            justify-content:center;
            display: flex;
            min-height: 100vh;
            background-color: #f3f4f6;
          }
          .formContainer {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
          }
          .formWrapper {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          .logo {
            display: block;
            height: 48px;
            margin: 0 auto 1.5rem;
          }
          .title {
            font-size: 2rem;
            font-weight: 800;
            text-align: center;
            color: #111827;
            margin-bottom: 2rem;
          }
          .tabs {
            display: flex;
            margin-bottom: 2rem;
          }
          .tabButton {
            flex: 1;
            padding: 0.75rem;
            background-color: transparent;
            border: none;
            border-bottom: 2px solid #e5e7eb;
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .tabButton.active {
            color: #3b82f6;
            border-bottom-color: #3b82f6;
          }
          .form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .formGroup {
            display: flex;
            flex-direction: column;
          }
          .label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.5rem;
          }
          .input {
            padding: 0.625rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }
          .input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          .passwordWrapper {
            position: relative;
          }
          .passwordToggle {
            position: absolute;
            right: 0.625rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #6b7280;
          }
          .button {
            padding: 0.75rem 1rem;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #2563eb;
          }
          .link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
          }
          .link:hover {
            text-decoration: underline;
          }
          .passwordStrength {
            height: 4px;
            background-color: #e5e7eb;
            border-radius: 2px;
            margin-top: 0.5rem;
          }
          .passwordStrengthIndicator {
            height: 100%;
            border-radius: 2px;
            transition: all 0.3s ease;
          }
          .weak { width: 33.33%; background-color: #ef4444; }
          .medium { width: 66.66%; background-color: #f59e0b; }
          .strong { width: 100%; background-color: #10b981; }
          .loginError {
            color: red;
            text-align: center;
            margin-bottom: 1rem;
          }
          .companyOption {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .companyLogo {
            width: 20px;
            height: 20px;
          }
      `}</style>

      <div className="container">
        <div className="formContainer">
          <div className="formWrapper">
            <h2 className="title">Welcome to ErrorSolver</h2>
            <div className="tabs">
              <button
                className={`tabButton ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`tabButton ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {activeTab === 'login' ? (
              <form className="form" onSubmit={handleLogin}>
                <div className="formGroup">
                  <label htmlFor="login-email" className="label">Email Address</label>
                  <input id="login-email" name="email" type="email" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="login-password" className="label">Password</label>
                  <div className="passwordWrapper">
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="passwordToggle"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="login-company" className="label">Company Name</label>
                  <select id="login-company" name="company" required className="input">
                    <option value="">Select your company</option>
                    {topCompanies.map((company, index) => (
                      <option key={index} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                {loginError && <p className="loginError">{loginError}</p>}
                <button type="submit" className="button">
                  Login
                </button>
                <div style={{ textAlign: 'center' }}>
                  <a href="#" className="link">Forgot your password?</a>
                </div>
              </form>
            ) : (
              <form className="form" onSubmit={handleSignup}>
                <div className="formGroup">
                  <label htmlFor="signup-name" className="label">Full Name</label>
                  <input id="signup-name" type="text" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-email" className="label">Email Address</label>
                  <input id="signup-email" type="email" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-password" className="label">Password</label>
                  <div className="passwordWrapper">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="input"
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="passwordToggle"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="passwordStrength">
                    <div
                      className={`passwordStrengthIndicator ${
                        passwordStrength === 1 ? 'weak' :
                        passwordStrength === 2 ? 'medium' :
                        passwordStrength === 3 ? 'strong' : ''
                      }`}></div>
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-company" className="label">Company Name</label>
                  <select id="signup-company" name="company" required className="input">
                    <option value="">Select your company</option>
                    {topCompanies.map((company, index) => (
                      <option key={index} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="button">
                  Sign Up
                </button>
                <div style={{ textAlign: 'center' }}>
                  Already have an account?{" "}
                  <a href="#" className="link" onClick={() => setActiveTab('login')}>Log In</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

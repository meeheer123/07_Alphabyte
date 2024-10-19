
import Home from './components/Home/Home'
import ErrorAnalyticsDashboard from './components/ErrorAnalyticsDashboard'
import ErrorClassificationDashboard from "./components/ErrorClassificationDashborad"
import AISolver from './components/aisolver'
import ErrorDashboard from './components/ErrorDashboard'
import LoginSignup from './components/login-signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'

function App() {

  return (
    <>


      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error-dashboard" element={<ErrorDashboard />} />
          <Route path="/error-analytics-dashboard" element={<ErrorAnalyticsDashboard />} />
          <Route path="/error-classification-dashboard" element={<ErrorClassificationDashboard />} />
          <Route path="/ai-solver" element={<AISolver />} />
          <Route path="/login-signup" element={<LoginSignup />} />
        </Routes>
      </Router>


    </>
  )
}

export default App

import { Routes, Route, useNavigate } from "react-router-dom"

// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

// okta
import { oktaConfig } from "../lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js"
import { Security, LoginCallback } from "@okta/okta-react"
import LoginWidget from "../Auth/LoginWidget";

function App() {
  const navigate = useNavigate()
  const oktaAuth = new OktaAuth(oktaConfig)

  const customAuthHandler = () => {
    navigate("/login")
  }

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true })
  }

  return (
    <div className="App">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
            <Route path="/login/callback" element={<LoginCallback />} />
          </Routes>
        </div>
      </Security>
    </div>
  );
}

export default App;

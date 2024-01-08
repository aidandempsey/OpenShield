import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/firebase/useAuthContext"
// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard"
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import CreateIncident from "./pages/incidents/CreateIncident";
import CreateDevice from "./pages/devices/createDevice/CreateDevice";
import Incident from "./pages/incidents/Incident";
import Search from "./pages/search/Search";
import CreateOrganization from "./pages/organization/CreateOrganization";

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={!user ? <Login /> : <Dashboard />} />
              <Route path='/login' element={!user ? <Login /> : <Dashboard />} />

              <Route path='/incidents/:id' element={user ? <Incident /> : <Navigate to="/login" />} />
              <Route path='/search' element={user ? <Search /> : <Navigate to="/login" />} />

              {/* Create */}
              <Route path='/createIncident' element={user ? <CreateIncident /> : <Navigate to="/login" />} />
              <Route path='/createDevice' element={user ? <CreateDevice /> : <Navigate to="/login" />} />
              <Route path='/createOrganization' element={user ? <CreateOrganization /> : <Navigate to="/login" />} />

            </Routes>
          </div>
        </BrowserRouter>
      )}

    </div >
  );
}

export default App;

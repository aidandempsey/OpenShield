import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/firebase/useAuthContext"
// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard"
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import CreateIncident from "./pages/create/incident/CreateIncident";
import CreateDevice from "./pages/create/device/CreateDevice"
import Incident from "./pages/incidents/incidents/Incident";
import Search from "./pages/search/Search";
import CreateOrganization from "./pages/create/organization/CreateOrganization";
import Settings from "./pages/settings/Settings";
import Organization from "./pages/organization/Organization";


function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={!user ? <Navigate to="/login" /> : <Dashboard />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />

              <Route path='/organizations/:id' element={user ? <Organization /> : <Navigate to="/login" />} />
              <Route path='/incidents/:id' element={user ? <Incident /> : <Navigate to="/login" />} />
              <Route path='/search' element={user ? <Search /> : <Navigate to="/login" />} />
              <Route path='/settings' element={user ? <Settings /> : <Navigate to="/login" />} />


              {/* Create */}
              <Route path='/createOrganization' element={user ? <CreateOrganization /> : <Navigate to="/login" />} />
              <Route path='/createIncident' element={user ? <CreateIncident /> : <Navigate to="/login" />} />
              <Route path='/createDevice' element={user ? <CreateDevice /> : <Navigate to="/login" />} />

              <Route path='*' element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />

            </Routes>
          </div>
        </BrowserRouter>
      )}

    </div >
  );
}

export default App;

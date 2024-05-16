// react router dom
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"

// hookes
import { useAuthContext } from "./hooks/firebase/useAuthContext"
import { useGet } from "./hooks/restful/useGet"

// styles & images
import "./App.css"

// components
import Dashboard from "./pages/dashboard/Dashboard"
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import CreateIncident from "./pages/incidents/incidents/CreateIncident"
import Incident from "./pages/incidents/incidents/Incident";
import SearchIncidents from "./pages/incidents/incidents/SearchIncidents";
import Settings from "./pages/settings/Settings";
import JoinOrganization from "./pages/organization/JoinOrganization"
import MuiLoading from "./components/material/loading/MuiLoading"

function App() {
  const { authIsReady, user } = useAuthContext()
  const { data: userHasOrganization, httpError: userHasOrganizationHttpError, isLoading: isUserHasOrganizationLoading } = useGet(`users/userHasOrganization`)

  if ((user && isUserHasOrganizationLoading)) return <MuiLoading />

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar userHasOrganization={userHasOrganization} />
          <div className="container">
            <Routes>
              <Route path='/' element={user ? (!userHasOrganization ? <JoinOrganization /> : <Dashboard />) : <Navigate to="/login" />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />

              <Route path='/incidents/:id' element={user ? <Incident /> : <Navigate to="/login" />} />
              <Route path='/searchIncidents' element={user ? <SearchIncidents /> : <Navigate to="/login" />} />
              <Route path='/settings' element={user ? <Settings /> : <Navigate to="/login" />} />


              {/* Create */}
              <Route path='/createIncident' element={user ? <CreateIncident /> : <Navigate to="/login" />} />

              <Route path='*' element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />

            </Routes>
            {userHasOrganizationHttpError && <div className="error">{userHasOrganizationHttpError}</div>}

          </div>
        </BrowserRouter>
      )}

    </div >
  );
}

export default App;

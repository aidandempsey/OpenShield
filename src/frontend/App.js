import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/firebase/useAuthContext"
// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard"
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import CreateIncident from "./pages/create/incident/CreateIncident";
import Incident from "./pages/incidents/incidents/Incident";
import Search from "./pages/search/Search";
import Settings from "./pages/settings/Settings";

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={user ? <Dashboard uid={user.uid} /> : <Navigate to="/login" />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />

              <Route path='/incidents/:id' element={user ? <Incident /> : <Navigate to="/login" />} />
              <Route path='/search' element={user ? <Search /> : <Navigate to="/login" />} />
              <Route path='/settings' element={user ? <Settings /> : <Navigate to="/login" />} />


              {/* Create */}
              <Route path='/createIncident' element={user ? <CreateIncident /> : <Navigate to="/login" />} />

              <Route path='*' element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />

            </Routes>
          </div>
        </BrowserRouter>
      )}

    </div >
  );
}

export default App;

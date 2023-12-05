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

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />


            <Route path='/createIncident' element={user ? <CreateIncident /> : <Navigate to="/" />} />
            <Route path='/createDevice' element={user ? <CreateDevice /> : <Navigate to="/" />} />
            <Route path='/incidents/:id' element={user ? <Incident /> : <Navigate to="/" />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;

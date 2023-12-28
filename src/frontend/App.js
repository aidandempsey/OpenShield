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

function App() {
  const { user } = useAuthContext()

  if (user === undefined) {
    return (
      <div className="app">
        <p className="loading">loading...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={!user ? <Login /> : <Dashboard />} />
            <Route path='/login' element={!user ? <Login /> : <Dashboard />} />
            <Route path='/createIncident' element={user ? <CreateIncident /> : <Navigate to="/" />} />
            <Route path='/createDevice' element={user ? <CreateDevice /> : <Navigate to="/" />} />
            <Route path='/incidents/:id' element={user ? <Incident /> : <Navigate to="/" />} />
            <Route path='/search' element={user ? <Search /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;

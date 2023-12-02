import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard";
import Organization from "./pages/organization/Organization"
import Incident from "./pages/incident/Incident"
import User from "./pages/user/User"
import Team from "./pages/team/Team"
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            {/* <Route path='/organization/:id' element={<Organization />} /> */}
            <Route path='/incident/:id' element={<Incident />} />
            {/* <Route path='/team/:id' element={<Team />} />
            <Route path='/user/:id' element={<User />} /> */}
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;

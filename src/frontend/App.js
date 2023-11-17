import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard";
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
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;

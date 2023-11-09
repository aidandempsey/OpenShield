import { BrowserRouter, Route, Routes } from "react-router-dom"

// styles
import "./App.css"

// pages and components
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

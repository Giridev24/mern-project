import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Signup from "./Signup";
import "./Signup.css";
import "./Nav.css";
import "./Dashboard.css";
import "./Add.css";
import { BrowserRouter as Router } from "react-router-dom"; // Rename BrowserRouter to Router
import Login from "./Login";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Add from "./Add";
import Cards from "./Cards";
import Pages from "./pages";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/pages" element={<Pages />} />
      </Routes>
    </Router>
  );
}

export default App;

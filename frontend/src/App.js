import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="App">
      <Header />
      {isHomePage && (
        <Container className="vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1 className="app-title mb-4">Welcome to WeatherView</h1>
          <p className="app-tagline mb-4">
            Your one-stop destination for accurate city-wide weather updates
          </p>
          <SearchBar />
        </Container>
      )}
      {!isHomePage && (
        <div>
          <Routes>
            <Route path="/dashboard/:location" element={<WeatherDashboard />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { createContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/fonts.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import News from "./modules/News";
import SideBar from "./components/SideBar";
import Settings from "./components/Settings";

// Create the context
export const WeatherDataContext = createContext();

function App() {
  const [data, setData] = useState({
    latitude: null,
    longitude: null,
    name: null,
    admin1: null,
    country: null,
    country_code: null,
    timezone: null,
  });
  const [error, setError] = useState(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <WeatherDataContext.Provider value={{ data, setData }}>
      <div className="App">
        <div className="app-header">
          <Header />
        </div>
        {error && <div>Error: {error}</div>}
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
          <div className="app-div">
            <div className="app-sidebar">
              <SideBar />
            </div>
            <div className="app-component">
              <Routes>
                <Route path="/dashboard" element={<Dashboard data={data} />} />
                <Route path="/social" element={<News data={data} />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </WeatherDataContext.Provider>
  );
}

export default App;

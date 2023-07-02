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
import Social from "./components/Social";
import SideBar from "./components/SideBar";
import Settings from "./components/Settings";

// Create the context
export const WeatherDataContext = createContext();

function App() {
  // const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // useEffect(() => {
  //   if (coordinates.latitude && coordinates.longitude) {
  //     fetchWeatherData(coordinates.latitude, coordinates.longitude).then(
  //       (data) => {
  //         if (data.error) {
  //           setError(data.error);
  //         } else {
  //           setWeatherData(data);
  //         }
  //       }
  //     );
  //   }
  // }, [coordinates]);

  // const fetchWeatherData = async (latitude, longitude) => {
  //   const response = await fetch(
  //     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&start_date=2023-06-10&end_date=2023-06-24&timezone=America%2FChicago`
  //   );
  //   const weatherData = await response.json();
  //   return weatherData;
  // };

  return (
    <WeatherDataContext.Provider value={{ coordinates, setCoordinates }}>
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
          <div className="app-div max-height">
            <div className="app-sidebar">
              <SideBar />
            </div>
            <div className="app-component max-height">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/social" element={<Social />} />
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

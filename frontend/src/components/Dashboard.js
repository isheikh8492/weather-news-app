import React, { useContext, useEffect, useRunOnce, useState } from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "./SideBar";
import { WeatherDataContext } from "../App";
import SomeGraph from "../modules/SomeGraph";
import TodayTemperature from "../modules/TodayTemperature";
import TemperatureForecast from "../modules/TemperatureForecast";
import CitySummary from "../modules/CitySummary";
import AirQuality from "../modules/AirQuality";
import "./Dashboard.css";

const Dashboard = () => {
  const { coordinates } = useContext(WeatherDataContext);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=1&timezone=America%2FChicago`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));

    console.log(weatherData);
  }, [coordinates]);

  return (
    <div className="grid-container">
      <div className="grid-item sidebar">
        <SideBar />
      </div>
      <div className="grid-item item1">
        <CitySummary />
      </div>
      <div className="grid-item item2">
        <SomeGraph />
      </div>
      <div className="grid-item item4">
        <AirQuality />
      </div>
      <div className="grid-item item5">
        <TodayTemperature
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          min={weatherData?.daily?.temperature_2m_min[0]}
          max={weatherData?.daily?.temperature_2m_max[0]}
          cloudiness={weatherData?.hourly?.cloudcover[0]}
          sunset={weatherData?.daily?.sunset[0]}
          sunrise={weatherData?.daily?.sunrise[0]}
          temperature={weatherData?.hourly?.temperature_2m[0]}
          weathercode={weatherData?.hourly?.weathercode[0]}
          cloudcoverUnit={weatherData?.hourly_units?.cloudcover}
          temperatureUnit={weatherData?.hourly_units?.temperature_2m}
        />
      </div>
      <div className="grid-item item6">
        <TemperatureForecast />
      </div>
    </div>
  );
};

export default Dashboard;

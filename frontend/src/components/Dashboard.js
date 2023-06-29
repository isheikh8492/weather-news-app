import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { WeatherDataContext } from "../App";
import TodayTemperatureGraph from "../modules/TodayTemperatureGraph";
import TodayTemperature from "../modules/TodayTemperature";
import TemperatureForecast from "../modules/TemperatureForecast";
import CitySummary from "../modules/CitySummary";
import AirQuality from "../modules/AirQuality";
import TimeCoordinates from "../modules/TimeCoordinates";
import "../css/components/Dashboard.css";

const Dashboard = () => {
  const { coordinates } = useContext(WeatherDataContext);
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&forecast_days=7&timezone=America%2FChicago`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));

    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index&timezone=America%2FChicago`
    )
      .then((response) => response.json())
      .then((data) => setAirQualityData(data));

    console.log(weatherData);
    console.log(airQualityData);
  }, [coordinates]);

  return (
    <div className="grid-container">
      <div className="grid-item sidebar">
        <SideBar />
      </div>
      <div className="grid-item item1">
        <CitySummary />
      </div>
      <div className="grid-item item7">
        <TimeCoordinates
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          cityName="Chicago"
          cityCountry="US"
        />
      </div>
      <div className="grid-item item2">
        <TodayTemperatureGraph
          time={weatherData?.hourly?.time.slice(0, 25)}
          temperature={weatherData?.hourly?.temperature_2m.slice(0, 25)}
          temperatureUnit={weatherData?.hourly_units?.temperature_2m}
        />
      </div>
      <div className="grid-item item4">
        <AirQuality
          windspeed={weatherData?.hourly?.windspeed_10m[0]}
          windspeedUnit={weatherData?.hourly_units?.windspeed_10m}
          winddirection={weatherData?.hourly?.winddirection_10m[0]}
          winddirectionUnit={weatherData?.hourly_units?.winddirection_10m}
          surfacepressure={weatherData?.hourly?.surface_pressure[0]}
          surfacepressureUnit={weatherData?.hourly_units?.surface_pressure}
          uvindex={weatherData?.daily?.uv_index_max[0]}
          humidity={weatherData?.hourly?.relativehumidity_2m[0]}
          humidityUnit={weatherData?.hourly_units?.relativehumidity_2m}
          so2={airQualityData?.hourly?.sulphur_dioxide[0]}
          no2={airQualityData?.hourly?.nitrogen_dioxide[0]}
          o3={airQualityData?.hourly?.ozone[0]}
          so2Unit={airQualityData?.hourly_units?.sulphur_dioxide}
          no2Unit={airQualityData?.hourly_units?.nitrogen_dioxide}
          o3Unit={airQualityData?.hourly_units?.ozone}
          visibility={weatherData?.hourly?.visibility[0]}
          visibilityUnit={weatherData?.hourly_units?.visibility}
        />
      </div>
      <div className="grid-item item5">
        <TodayTemperature
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
        <TemperatureForecast
          time={weatherData?.hourly?.time}
          temperature={weatherData?.hourly?.temperature_2m}
          temperatureUnit={weatherData?.hourly_units?.temperature_2m}
          weathercode={weatherData?.hourly?.weathercode}
        />
      </div>
    </div>
  );
};

export default Dashboard;

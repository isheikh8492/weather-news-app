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
import { getCurrentLocalIndex } from "../utils/Functions";

const Dashboard = () => {
  const { coordinates } = useContext(WeatherDataContext);
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(-1);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=7&timezone=America%2FChicago`
      );
      const data = await response.json();
      setWeatherData(data);

      if (data.hourly?.time) {
        const currentIndex = getCurrentLocalIndex(data.hourly.time);
        setCurrentTimeIndex(currentIndex);
      }
    };

    const fetchAirQualityData = async () => {
      const response = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index&timezone=America%2FChicago`
      );
      const data = await response.json();
      setAirQualityData(data);
    };

    fetchWeatherData();
    fetchAirQualityData();
  }, [coordinates]);

  return (
    <div className="grid-container">
      <div className="grid-item item1">
        <CitySummary
          coordinates={coordinates}
          hourlyData={weatherData?.hourly}
          hourlyDataUnits={weatherData?.hourly_units}
          cityCountry="US"
          cityName="Chicago"
        />
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
          windspeed={weatherData?.hourly?.windspeed_10m[currentTimeIndex]}
          windspeedUnit={weatherData?.hourly_units?.windspeed_10m}
          winddirection={
            weatherData?.hourly?.winddirection_10m[currentTimeIndex]
          }
          winddirectionUnit={weatherData?.hourly_units?.winddirection_10m}
          surfacepressure={
            weatherData?.hourly?.surface_pressure[currentTimeIndex]
          }
          surfacepressureUnit={weatherData?.hourly_units?.surface_pressure}
          uvindex={airQualityData?.hourly?.uv_index[currentTimeIndex]}
          humidity={weatherData?.hourly?.relativehumidity_2m[currentTimeIndex]}
          humidityUnit={weatherData?.hourly_units?.relativehumidity_2m}
          so2={airQualityData?.hourly?.sulphur_dioxide[currentTimeIndex]}
          no2={airQualityData?.hourly?.nitrogen_dioxide[currentTimeIndex]}
          o3={airQualityData?.hourly?.ozone[currentTimeIndex]}
          so2Unit={airQualityData?.hourly_units?.sulphur_dioxide}
          no2Unit={airQualityData?.hourly_units?.nitrogen_dioxide}
          o3Unit={airQualityData?.hourly_units?.ozone}
          visibility={weatherData?.hourly?.visibility[currentTimeIndex]}
          visibilityUnit={weatherData?.hourly_units?.visibility}
        />
      </div>
      <div className="grid-item item5">
        <TodayTemperature
          min={weatherData?.daily?.temperature_2m_min[0]}
          max={weatherData?.daily?.temperature_2m_max[0]}
          cloudiness={weatherData?.hourly?.cloudcover[currentTimeIndex]}
          sunset={weatherData?.daily?.sunset[0]}
          sunrise={weatherData?.daily?.sunrise[0]}
          temperature={weatherData?.hourly?.temperature_2m[currentTimeIndex]}
          weathercode={weatherData?.hourly?.weathercode[currentTimeIndex]}
          cloudcoverUnit={weatherData?.hourly_units?.cloudcover}
          temperatureUnit={weatherData?.hourly_units?.temperature_2m}
          apparentTemperature={
            weatherData?.hourly?.apparent_temperature[currentTimeIndex]
          }
          apparentTemperatureUnit={
            weatherData?.hourly_units?.apparent_temperature
          }
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

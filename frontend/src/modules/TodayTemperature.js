import React, { useState, useEffect } from "react";
import "./TodayTemperature.css";
import { weatherTable } from "../dataset/WeatherCode";

const TodayTemperature = ({
  latitude,
  longitude,
  min,
  max,
  cloudiness,
  sunset,
  sunrise,
  temperature,
  weathercode,
  cloudcoverUnit,
  temperatureUnit,
}) => {
  const weathercodeDescription = weatherTable[weathercode];
  const [icon, setIcon] = useState(null);

  const weatherIcon = (weathercode) => {
    let iconString = "";
    if (weathercode >= 0 && weathercode <= 1) {
      iconString = "clear-day";
    } else if (weathercode === 2) {
      iconString = "cloudy";
    } else if (weathercode === 3) {
      iconString = "overcast-day";
    } else if (weathercode >= 4 && weathercode < 51) {
      iconString = "fog-day";
    } else if (weathercode >= 51 && weathercode <= 57) {
      iconString = "drizzle";
    } else if (weathercode >= 58 && weathercode <= 67) {
      iconString = "rainy";
    } else if (weathercode >= 68 && weathercode <= 79) {
      iconString = "snow";
    } else if (weathercode >= 80 && weathercode <= 82) {
      iconString = "rainy";
    } else if (weathercode >= 83 && weathercode <= 86) {
      iconString = "sleet";
    } else if (weathercode === "95 *") {
      iconString = "thunderstorm-day";
    } else if (weathercode === "99 *") {
      iconString = "thunderstorm-day-snow";
    } else {
      iconString = "thunderstorm-day-rain";
    }
    return iconString;
  };

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const iconString = weatherIcon(weathercode);
        const { default: src } = await import(`../assets/${iconString}.svg`);
        setIcon(src);
      } catch (err) {
        console.log(`Failed to load icon: ${weathercode}`);
      }
    };
    loadIcon();
  }, []);

  return (
    <div className="summary-container">
      <div className="summary-box">
        <div className="currentTempDetails">
          <img src={icon} alt={weatherIcon(weathercode)} />
          <p className="current-temperature">
            {temperature}
            {temperatureUnit}
          </p>
          <p className="cloudcover-attribute">{weathercodeDescription}</p>
        </div>
        <p className="temp-attribute">
          Cloudiness: {cloudiness}
          {cloudcoverUnit}
        </p>
        <p className="temp-attribute">
          Min: {min}
          {temperatureUnit}
        </p>
        <p className="temp-attribute">
          Max: {max}
          {temperatureUnit}
        </p>
        <p className="temp-attribute">Sunset: {sunset}</p>
        <p className="temp-attribute">Sunrise: {sunrise}</p>
      </div>
    </div>
  );
};

export default TodayTemperature;

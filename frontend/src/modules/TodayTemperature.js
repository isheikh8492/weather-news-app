import React, { useState, useEffect } from "react";
import "../css/modules/TodayTemperature.css";
import { weatherTable } from "../utils/WeatherCode";
import CloudImg from "../assets/cloud.png";
import MinImg from "../assets/min-temp.png";
import MaxImg from "../assets/max-temp.png";
import SunriseImg from "../assets/sunrise.png";
import SunsetImg from "../assets/sunset.png";
import { weatherIcon, convertTime, roundTemperature } from "../utils/Functions";

const TodayTemperature = ({
  min,
  max,
  cloudiness,
  sunset,
  sunrise,
  temperature,
  weathercode,
  cloudcoverUnit,
  temperatureUnit,
  apparentTemperature,
  apparentTemperatureUnit,
}) => {
  const weathercodeDescription = weatherTable[weathercode];
  const [icon, setIcon] = useState(null);

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
  });

  return (
    <div className="daily-summary-container">
      <div className="daily-summary-box">
        <div className="currentTempDetails">
          <img className="icon" src={icon} alt={weatherIcon(weathercode)} />
          <p className="current-temperature">
            {roundTemperature(temperature)}
            {temperatureUnit}
          </p>
          <p className="cloudcover-attribute">
            {weathercodeDescription}{" "}
            <span className="b">
              (Feels Like {roundTemperature(apparentTemperature)}
              {apparentTemperatureUnit})
            </span>
          </p>
        </div>
        <p className="temp-attribute">
          <img className="daily-attribute" src={CloudImg} alt="cloudiness" />
          <span className="temp-text">
            Cloudiness: {cloudiness}
            {cloudcoverUnit}
          </span>
        </p>
        <p className="temp-attribute">
          <img
            className="daily-attribute-temp"
            src={MinImg}
            alt="Minimum temperature"
          />
          <span className="temp-text">
            Min: {roundTemperature(min)}
            {temperatureUnit}
          </span>
        </p>
        <p className="temp-attribute">
          <img
            className="daily-attribute-temp"
            src={MaxImg}
            alt="Maximum temperature"
          />
          <span className="temp-text">
            Max: {roundTemperature(max)}
            {temperatureUnit}
          </span>
        </p>
        <p className="temp-attribute">
          <img
            className="daily-attribute"
            src={SunriseImg}
            alt="Sunrise time"
          />
          <span className="temp-text">Sunrise: {convertTime(sunrise)}</span>
        </p>
        <p className="temp-attribute">
          <img className="daily-attribute" src={SunsetImg} alt="Sunset time" />
          <span className="temp-text">Sunset: {convertTime(sunset)}</span>
        </p>
      </div>
    </div>
  );
};

export default TodayTemperature;

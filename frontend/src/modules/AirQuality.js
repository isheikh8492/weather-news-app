import React from "react";
import "../css/modules/AirQuality.css";
import windImg from "../assets/wind.png";
import pressureImg from "../assets/pressure.png";
import humidityImg from "../assets/humidity.png";
import airqualityImg from "../assets/air-quality.png";
import {
  estimateWindSpeed,
  getPressure,
  getAirQuality,
} from "../utils/Functions";

const AirQuality = ({
  windspeed,
  windspeedUnit,
  winddirection,
  winddirectionUnit,
  surfacepressure,
  surfacepressureUnit,
  uvindex,
  humidity,
  humidityUnit,
  so2,
  no2,
  o3,
  so2Unit,
  no2Unit,
  o3Unit,
}) => {
  return (
    <div className="container">
      <div className="box">
        <img className="windImg" src={windImg} alt="wind" />
        <p>
          <span className="airquality-text">
            Wind: {estimateWindSpeed(windspeed)}
          </span>
        </p>
        <div className="airquality-text-smaller">
          <span>
            Speed: {windspeed} {windspeedUnit}
          </span>
          <br />
          <span>
            Direction: {winddirection}
            {winddirectionUnit}
          </span>
        </div>
      </div>
      <div className="box">
        <img className="pressureImg" src={pressureImg} alt="pressure" />
        <p>
          <span className="airquality-text">
            Pressure: {getPressure(surfacepressure)}
          </span>
        </p>
        <div className="airquality-text-smaller">
          <span>
            {surfacepressure} {surfacepressureUnit}
          </span>
          <br />
        </div>
      </div>
      <div className="box">
        <img
          className="airqualityImg"
          src={airqualityImg}
          alt="air quality level"
        />
        <p>
          <span className="airquality-text">
            Air Quality: {getAirQuality(so2, no2, uvindex, o3)}
          </span>
        </p>
        <div className="airquality-text-smaller">
          <span>
            NO<sub>2</sub>: {no2} {no2Unit}
          </span>
          <br />
          <span>
            SO<sub>2</sub>: {so2} {so2Unit}
          </span>
          <br />
          <span>
            O<sub>3</sub>: {o3} {o3Unit}
          </span>
        </div>
      </div>
      <div className="box">
        <img className="humidityImg" src={humidityImg} alt="humidity level" />
        <p>
          <span className="airquality-text">
            Humidity: {humidity}
            {humidityUnit}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AirQuality;

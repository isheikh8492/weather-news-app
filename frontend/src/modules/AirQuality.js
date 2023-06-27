import React from "react";
import "../css/modules/AirQuality.css";
import windImg from "../assets/wind.png";
import pressureImg from "../assets/pressure.png";
import humidityImg from "../assets/humidity.png";
import airqualityImg from "../assets/air-quality.png";

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
  const estimateWindSpeed = (speed) => {
    let description;
    switch (true) {
      case 0:
        description = "Calm";
        break;
      case speed >= 1 && speed <= 3:
        description = "Light Air";
        break;
      case speed >= 4 && speed <= 7:
        description = "Light Breeze";
        break;
      case speed >= 8 && speed <= 12:
        description = "Gentle Breeze";
        break;
      case speed >= 13 && speed <= 18:
        description = "Moderate Breeze";
        break;
      case speed >= 19 && speed <= 24:
        description = "Fresh Breeze";
        break;
      case speed >= 25 && speed <= 31:
        description = "Strong Breeze";
        break;
      case speed >= 32 && speed <= 38:
        description = "Near Gale";
        break;
      case speed >= 39 && speed <= 46:
        description = "Gale";
        break;
      case speed >= 47 && speed <= 54:
        description = "Strong Gale";
        break;
      case speed >= 55 && speed <= 63:
        description = "Whole Gale";
        break;
      case speed >= 64 && speed <= 75:
        description = "Storm Force";
        break;
      case speed > 75:
        description = "Hurricane Force";
        break;
      default:
        description = "Calm";
        break;
    }
    return description;
  };

  const getPressure = (hPa) => {
    let description;
    switch (true) {
      case hPa > 1023.25:
        description = "High";
        break;
      case hPa >= 1009.14 && hPa <= 1023.25:
        description = "Normal";
        break;
      case hPa < 1009.14:
        description = "Low";
        break;
      default:
        description = "Normal";
        break;
    }
    return description;
  };

  const getAirQuality = (so2, no2, uvIndex, o3) => {
    let so2Normalized = so2 / 20;
    let no2Normalized = no2 / 40;
    let uvNormalized = uvIndex / 5;
    let o3Normalized = o3 / 100;

    let maxNormalizedValue = Math.max(
      so2Normalized,
      no2Normalized,
      uvNormalized,
      o3Normalized
    );
    let qualityOfAir = "";

    switch (true) {
      case maxNormalizedValue <= 2:
        qualityOfAir = "Good";
        break;
      case maxNormalizedValue > 2 && maxNormalizedValue <= 4:
        qualityOfAir = "Fair";
        break;
      case maxNormalizedValue > 4 && maxNormalizedValue <= 10:
        qualityOfAir = "Moderate";
        break;
      case maxNormalizedValue > 10:
        qualityOfAir = "Poor";
        break;
      default:
        qualityOfAir = "Good";
        break;
    }

    return qualityOfAir;
  };

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

import React, { useState, useEffect } from "react";
import "../css/modules/TimeCoordinates.css";
import { convertLocalTime, formatDate } from "../utils/Functions";

const TimeCoordinates = ({ latitude, longitude, cityName, cityCountry }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000); // update time every 1 minute
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setTime(new Date());
  };
  return (
    <div className="summary-container">
      <div className="clockBox">
        <div className="location">
          <span className="city b">
            {cityName}, {cityCountry}
          </span>
          <br />
          <div className="coords">
            <span>Lat: {latitude}</span>
            <br />
            <span>Lon: {longitude}</span>
          </div>
        </div>
        <div className="vertical-line" />
        <div className="time">
          <span className="b clockTime">{convertLocalTime(time)}</span>
          <br />
          <span className="clockDay">{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default TimeCoordinates;

import React, { useState, useEffect } from "react";
import "../css/modules/TimeCoordinates.css";
import { convertLocalTime, formatDate } from "../utils/Functions";
import moment from "moment-timezone";

const TimeCoordinates = ({ data }) => {
  const [time, setTime] = useState(moment.tz(data.timezone));

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000); // update time every 1 second
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [data.timezone]);

  const tick = () => {
    setTime(moment.tz(data.timezone));
  };

  return (
    <div className="summary-container">
      <div className="clockBox">
        <div className="location">
          <span className="city b locationSpan">
            {data.name}, {data.admin1},
          </span>
          <br />
          <span className="city b locationSpan">{data.country}</span>
          <br />
          <div className="coords">
            <span>Lat: {data.latitude}</span>
            <br />
            <span>Lon: {data.longitude}</span>
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

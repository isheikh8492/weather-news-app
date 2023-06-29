import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/modules/TemperatureForecast.css";
import {
  convertTime,
  getWeatherIcon,
  convertDate,
  convertDayName,
} from "../utils/Functions";
import { weatherTable } from "../utils/WeatherCode";

const TemperatureForecast = ({
  time,
  temperature,
  temperatureUnit,
  weathercode,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadIcons = async () => {
      const weatherCards = await Promise.all(
        time.map(async (t, index) => {
          if (index % 3 === 0) {
            const weatherType = weatherTable[weathercode[index]];
            const icon = await getWeatherIcon(weathercode[index]);
            return {
              time: convertTime(t),
              date: convertDate(t),
              day: convertDayName(t),
              temperature: `${temperature[index]} ${temperatureUnit}`,
              weather: weatherType,
              weatherIcon: icon,
            };
          }
          return null;
        })
      );
      setData(weatherCards.filter((item) => item !== null));
    };

    loadIcons();
  }, [time, temperature, temperatureUnit, weathercode]);

  const itemsPerSlide = 8;

  const slides = data.reduce((acc, _, i) => {
    if (i % itemsPerSlide === 0) acc.push(data.slice(i, i + itemsPerSlide));
    return acc;
  }, []);

  return (
    <Carousel
      showArrows
      showStatus={false}
      showThumbs={false}
      showIndicators={false}
    >
      {slides.map((slide, i) => (
        <div key={i} className="weatherCardContainer">
          {slide.map((item, index) => (
            <div key={index} className="weatherCard">
              <span className="weatherCard-text">{item.time}</span>
              <br />
              <span className="weatherCard-text b larger">
                {item.temperature}
              </span>
              <br />
              {item.weatherIcon && (
                <img
                  className="cardImg"
                  src={item.weatherIcon}
                  alt={item.weather}
                />
              )}
              <br />
              <span className="weatherCard-text b little-larger">
                {item.date}
              </span>
              <br />
              {/* <span className="weatherCard-text">{item.day}</span> */}
              <span className="weatherCard-text small-spacing weatherCard-text-weather">
                {item.weather}
              </span>
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default TemperatureForecast;

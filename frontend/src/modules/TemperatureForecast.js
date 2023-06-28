import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/modules/TemperatureForecast.css";

const TemperatureForecast = () => {
  const data = new Array(64).fill(null); // Dummy data
  const itemsPerSlide = 8; // Items per slide

  const slides = data.reduce((acc, _, i) => {
    if (i % itemsPerSlide === 0) acc.push(data.slice(i, i + itemsPerSlide));
    return acc;
  }, []);

  return (
    <div className="summary-container">
      <div className="summary-box">
        <Carousel
          showArrows
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          dynamicHeight
        >
          {slides.map((slide, i) => (
            <div key={i} className="weatherCardContainer">
              {slide.map((item, index) => (
                <div key={index} className="weatherCard">
                  <span className="weatherCard-text">
                    Weather Card {index + 1 + i * itemsPerSlide}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TemperatureForecast;

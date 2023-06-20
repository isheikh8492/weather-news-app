import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import AirQualityComponent from "./AirQualityComponent";
import DailyTemperatureComponent from "./DailyTemperatureComponent";
import GPTSummaryComponent from "./GPTSummaryComponent";
import SideBar from "./SideBar";
import { WeatherDataContext } from "../App"; // Import WeatherDataContext

const WeatherDashboard = () => {
  const { coordinates } = useContext(WeatherDataContext);

  return (
    <div>
      <Row>
        <Col md={1}>
          <SideBar />
        </Col>
        <Col md={5}>
          <GPTSummaryComponent />
        </Col>
        <Col md={6}>
          <DailyTemperatureComponent
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
          <AirQualityComponent
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
        </Col>
      </Row>
      {/* Other components, passing the location as a prop if necessary */}
    </div>
  );
};

export default WeatherDashboard;

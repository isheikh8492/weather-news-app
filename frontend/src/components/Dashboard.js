import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "./SideBar";
import { WeatherDataContext } from "../App";
import SomeGraph from "../modules/SomeGraph";
import TodayTemperature from "../modules/TodayTemperature";
import TemperatureForecast from "../modules/TemperatureForecast";
import CitySummary from "../modules/CitySummary";
import AirQuality from "../modules/AirQuality";
import "./Dashboard.css";

const Dashboard = () => {
  const { coordinates } = useContext(WeatherDataContext);

  return (
    <Row>
      <Col md={1}>
        <SideBar />
      </Col>
      <Col md={10}>
        <div className="grid-container">
          <div className="grid-item item1">
            <CitySummary />
          </div>
          <div className="grid-item item2">
            <SomeGraph />
          </div>
          <div className="grid-item item4">
            <AirQuality />
          </div>
          <div className="grid-item item5">
            <TodayTemperature />
          </div>
          <div className="grid-item item6">
            <TemperatureForecast />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;

import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import AirQualityComponent from "./AirQualityComponent";
import DailyTemperatureComponent from "./DailyTemperatureComponent";
import GPTSummaryComponent from "./GPTSummaryComponent";
import SideBar from "./SideBar";

// import OtherComponent from "./OtherComponent"; // Replace with your actual components

const Dashboard = () => {
  let { location } = useParams();

  return (
    <div>
      <Row>
        <Col md={1}>
          <SideBar />
        </Col>
        <Col md={3}>
          <GPTSummaryComponent />
        </Col>
        <Col md={8}>
          <AirQualityComponent />
          <DailyTemperatureComponent />
        </Col>
      </Row>
      {/* Other components, passing the location as a prop if necessary */}
    </div>
  );
};

export default Dashboard;

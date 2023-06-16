import React from "react";
import { useParams } from "react-router-dom";
import AirQualityComponent from "./AirQualityComponent";
import DailyTemperatureComponent from "./DailyTemperatureComponent";
import GPTSummaryComponent from "./GPTSummaryComponent";
import SideBar from "./SideBar";

// import OtherComponent from "./OtherComponent"; // Replace with your actual components

const Dashboard = () => {
  let { location } = useParams();

  return (
    <div>
      <SideBar />
      <AirQualityComponent />
      <DailyTemperatureComponent />
      <GPTSummaryComponent />
      {/* Other components, passing the location as a prop if necessary */}
    </div>
  );
};

export default Dashboard;

import React from "react";
import "./SideBar.css";
import { FaCloudSun, FaTemperatureHigh, FaWind } from "react-icons/fa"; // import icons

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="sidebar-item">
        <FaCloudSun className="sidebar-icon" /> {/* add icon */}
        <span className="sidebar-text">Weather</span>
      </button>
      <button className="sidebar-item">
        <FaTemperatureHigh className="sidebar-icon" /> {/* add icon */}
        <span className="sidebar-text">Temperature</span>
      </button>
      <button className="sidebar-item">
        <FaWind className="sidebar-icon" /> {/* add icon */}
        <span className="sidebar-text">Air Quality</span>
      </button>
    </div>
  );
}

export default Sidebar;

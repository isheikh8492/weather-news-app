import React from "react";
import "../css/components/SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faNewspaper,
  faGear,
} from "@fortawesome/free-solid-svg-icons"; // import icons

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="sidebar-item">
        <FontAwesomeIcon icon={faCloud} />
        <span className="sidebar-text">Weather Conditions</span>
      </button>
      <button className="sidebar-item">
        <FontAwesomeIcon icon={faNewspaper} />
        <span className="sidebar-text">Social Feed</span>
      </button>
      <button className="sidebar-item">
        <FontAwesomeIcon icon={faGear} />
        <span className="sidebar-text">Settings</span>
      </button>
    </div>
  );
}

export default Sidebar;

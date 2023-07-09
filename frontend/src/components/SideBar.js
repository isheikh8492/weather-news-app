import React from "react";
import "../css/components/SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faNewspaper,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Link to="/dashboard" className="sidebar-item">
          <button className="sidebar-item" title="Weather Conditions">
            <FontAwesomeIcon icon={faCloud} />
            <span className="sidebar-text">Weather Conditions</span>
          </button>
        </Link>
        <Link to="/social" className="sidebar-item">
          <button className="sidebar-item" title="Social Feed">
            <FontAwesomeIcon icon={faNewspaper} />
            <span className="sidebar-text">Social Feed</span>
          </button>
        </Link>
        <Link to="/settings" className="sidebar-item">
          <button className="sidebar-item" title="Settings">
            <FontAwesomeIcon icon={faGear} />
            <span className="sidebar-text">Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

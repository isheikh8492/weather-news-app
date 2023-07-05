import React, { useState } from "react";
import "../css/components/Settings.css";

const Settings = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [theme, setTheme] = useState("Light");
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneNumber, city, state, theme, temperatureUnit);
  };
  return (
    <div className="settings-container">
      <div className="settings-box">
        <div className="settings-form">
          <form onSubmit={handleSubmit}>
            <div className="settings-section">
              <span
                style={{
                  fontSize: "50px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                Daily Weather Notification
              </span>
              <div className="settings-row">
                <label className="settings-label">Phone Number:</label>
                <input
                  className="settings-input"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="settings-row">
                <label className="settings-label">City:</label>
                <input
                  type="text"
                  className="settings-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="settings-row">
                <label className="settings-label">Country:</label>
                <input
                  type="text"
                  className="settings-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <span style={{ fontSize: "15px" }}>
                *Only supports US and Canadian phone numbers.*
              </span>
            </div>

            <button className="settings-submit" type="submit">
              Save
            </button>
          </form>
        </div>
        <div className="vertical-line"></div>
        <div className="settings-section">
          <div className="settings-row">
            <label className="settings-label">Theme:</label>
            <div className="toggle-container">
              <span className="temp-text">Light</span>
              <div className="temp-checkbox">
                <input type="checkbox" id="toggle-btn" />
                <label id="toggle-label" htmlFor="toggle-btn"></label>
              </div>
              <span className="temp-text">Dark</span>
            </div>
          </div>
          <div className="settings-row">
            <label className="settings-label">Temperature Unit:</label>
            <div className="toggle-container2">
              <span className="temp-text">Celsius</span>
              <div className="temp-checkbox2">
                <input type="checkbox" id="toggle-btn2" />
                <label id="toggle-label2" htmlFor="toggle-btn2"></label>
              </div>
              <span className="temp-text">Fahrenheit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

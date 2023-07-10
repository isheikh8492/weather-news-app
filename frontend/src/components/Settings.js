import React, { useState, useEffect } from "react";
import "../css/components/Settings.css";
import { doc, setDoc } from "firebase/firestore"; // Import firebase functions
import { db } from "../utils/firebase-config"; // Import your Firebase config

let timeout = null;

const Settings = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [theme, setTheme] = useState("Light");
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionData, setSuggestionData] = useState({});
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneNumber, city, state, theme, temperatureUnit);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
    );
    const data = await response.json();

    if (data && data.results) {
      const formattedSuggestions = data.results.map(
        (item) =>
          `${item.name}, ${item.admin1 ? item.admin1 + ", " : ""}${
            item.country
          }`
      );
      const newSuggestionData = data.results.reduce((obj, item, index) => {
        const suggestion = formattedSuggestions[index];
        obj[suggestion] = item;
        return obj;
      }, {});
      setSuggestionData(newSuggestionData);
      setSuggestions(formattedSuggestions);
    }
  };

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fetchSuggestions(city), 500);
  }, [city]);

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
                <div className="inputWithSuggestions">
                  <input
                    type="text"
                    className="settings-input"
                    value={city}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="suggestionList">
                    {suggestions.map((suggestion, index) => (
                      <div
                        className="suggestion"
                        key={index}
                        onClick={() => {
                          setCity(suggestion);
                          setSelectedSuggestion(suggestionData[suggestion]);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: "17px" }}>
                *Only supports US and Canadian phone numbers.*
              </span>
              <span style={{ fontSize: "17px" }}>
                *Phone numbers should be entered starting with '+'.*
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

import React, { useState, useEffect } from "react";
import "../css/components/Settings.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";

let timeout = null;

const sendMessage = async (to, body) => {
  try {
    const response = await fetch("/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: to, message: body }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

const Settings = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [theme, setTheme] = useState("Light");
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionData, setSuggestionData] = useState({});
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Use phone number as document ID
    const docRef = doc(db, "users", phoneNumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document with this phone number already exists
      const userData = docSnap.data();

      if (userData.city === selectedSuggestion.name) {
        // The city matches, so do nothing
        console.log(
          `User with phone number ${phoneNumber} already registered with city ${selectedSuggestion.name}`
        );
      } else {
        // The city does not match, so update the existing document
        console.log(
          `Updating user ${phoneNumber} from city ${userData.city} to city ${selectedSuggestion.name}`
        );
        await setDoc(
          docRef,
          {
            phoneNumber: phoneNumber,
            name: selectedSuggestion.name,
            admin1: selectedSuggestion.admin1,
            country: selectedSuggestion.country,
            country_code: selectedSuggestion.country_code,
            timezone: selectedSuggestion.timezone,
            latitude: selectedSuggestion.latitude,
            longitude: selectedSuggestion.longitude,
          },
          { merge: true }
        );
      }
    } else {
      // Document with this phone number does not exist, so create a new one
      console.log(
        `Registering new user with phone number ${phoneNumber} and city ${selectedSuggestion.name}`
      );
      await setDoc(docRef, {
        phoneNumber: phoneNumber,
        name: selectedSuggestion.name,
        admin1: selectedSuggestion.admin1,
        country: selectedSuggestion.country,
        country_code: selectedSuggestion.country_code,
        timezone: selectedSuggestion.timezone,
        latitude: selectedSuggestion.latitude,
        longitude: selectedSuggestion.longitude,
      });

      const docRef = doc(db, "locations", city);
      await setDoc(docRef, {
        latitude: selectedSuggestion.latitude,
        longitude: selectedSuggestion.longitude,
        name: selectedSuggestion.name,
        country: selectedSuggestion.country,
        country_code: selectedSuggestion.country_code,
        admin1: selectedSuggestion.admin1,
        timezone: selectedSuggestion.timezone,
      });

      // After storing the user data, send a test SMS
      const message =
        "You have subscribed to our weather notification service!";
      await sendMessage(phoneNumber, message);
    }
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
            <span className="unsubscribe-text">Unsubscribe from list</span>
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

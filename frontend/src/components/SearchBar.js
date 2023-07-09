import React, { useState, useContext, useEffect } from "react"; // Import useEffect
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { WeatherDataContext } from "../App"; // Import WeatherDataContext
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import firebase functions
import { db } from "../utils/firebase-config"; // Import your Firebase config
import styles from "../css/components/SearchBar.module.css"; // Import css modules stylesheet as styles

let timeout = null;

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionData, setSuggestionData] = useState({});
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const { setData } = useContext(WeatherDataContext);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
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
    timeout = setTimeout(() => fetchSuggestions(searchQuery), 500);
  }, [searchQuery]);

  const searchWeather = async () => {
    if (!selectedSuggestion) return; // If no suggestion selected, return
    console.log(selectedSuggestion);
    const {
      latitude,
      longitude,
      name,
      admin1,
      country,
      country_code,
      timezone,
    } = selectedSuggestion;

    setData({
      latitude,
      longitude,
      name,
      admin1,
      country,
      country_code,
      timezone,
    });

    // Save the data to Firebase
    const docRef = doc(db, "locations", searchQuery);
    await setDoc(docRef, {
      latitude,
      longitude,
      name,
      country,
      country_code,
      admin1,
      timezone,
    });

    navigate(`/dashboard`);
  };

  return (
    <Form className={`w-50 ${styles.searchBarContainer}`}>
      <Row>
        <Col md={8} className={styles.inputWithSuggestions}>
          <Form.Control
            className="mb-2"
            type="text"
            value={searchQuery}
            placeholder="Enter City Name and/or Country Name"
            onChange={handleInputChange}
          />
          <div className={styles.suggestionList}>
            {suggestions.map((suggestion, index) => (
              <div
                className={styles.suggestion}
                style={{ width: "50%!important" }}
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion);
                  setSelectedSuggestion(suggestionData[suggestion]); // Set the selected suggestion data
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </Col>
        <Col
          md={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Button className="search-btn" onClick={searchWeather}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;

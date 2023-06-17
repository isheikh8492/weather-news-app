import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar({ className }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const fetchGeoCode = async (location) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json?access_token=${mapboxToken}`
    );

    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].center;
    } else {
      return null;
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchWeather = async () => {
    fetch("/weather?location=" + encodeURIComponent(searchQuery))
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard/" + encodeURIComponent(data.location));
      });
    const coords = await fetchGeoCode(searchQuery);
    if (coords) {
      const [longitude, latitude] = coords;
      console.log(longitude, latitude);
    } else {
      console.log("No matching location found");
    }
  };

  return (
    <Form className={`w-50`}>
      <Row>
        <Col md={8}>
          <Form.Control
            className="mb-2"
            type="text"
            value={searchQuery}
            placeholder="Enter City Name and/or Country Name"
            onChange={handleInputChange}
          />
          <div>
            {suggestions.map((suggestion, index) => (
              <div key={index} onClick={() => setSearchQuery(suggestion)}>
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

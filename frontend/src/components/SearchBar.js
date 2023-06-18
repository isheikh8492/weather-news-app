import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { chicagoData } from "../MapBoxGeocoding";

function SearchBar({ className }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchWeather = async () => {
    fetch("/weather?location=" + encodeURIComponent(searchQuery))
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard/" + encodeURIComponent(data.location));
      });
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

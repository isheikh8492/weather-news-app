import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SearchBar({ className }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchWeather = () => {
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

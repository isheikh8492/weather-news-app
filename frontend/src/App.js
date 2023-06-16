import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchWeather = () => {
    fetch("/weather?location=" + encodeURIComponent(searchQuery))
      .then((response) => response.json())
      .then((data) => {
        console.log(data.location);
      });
  };

  return (
    <div className="App">
      <Container className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="app-title mb-4">Welcome to WeatherView</h1>
        <p className="app-tagline mb-4">
          Your one-stop destination for accurate city-wide weather updates
        </p>
        <Form className="w-50">
          <Row>
            <Col md={8}>
              <Form.Control
                className="mb-2"
                type="text"
                value={searchQuery}
                placeholder="Enter city name, Zipcode or Country name"
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
      </Container>
    </div>
  );
}

export default App;

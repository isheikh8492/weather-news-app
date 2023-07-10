import React from "react";
import { Container } from "react-bootstrap";
import "../css/components/Home.css";

function Home() {
  return (
    <Container className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title mb-4 b">Welcome to WeatherView</h1>
      <p className="app-tagline mb-4 b">
        Your one-stop destination for accurate city-wide weather updates
      </p>
    </Container>
  );
}

export default Home;

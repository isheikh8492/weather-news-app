import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import AirQualityComponent from "./AirQualityComponent";
import DailyTemperatureComponent from "./DailyTemperatureComponent";
import GPTSummaryComponent from "./GPTSummaryComponent";
import SideBar from "./SideBar";
import { chicagoData } from "../MapBoxGeocoding";

const WeatherDashboard = () => {
  let { location } = useParams();
  console.log(location);
  const [coordinates, setCoordinates] = React.useState({
    latitude: null,
    longitude: null,
  });

  React.useEffect(() => {
    fetchGeoCode(location).then((coordinates) => {
      if (coordinates) {
        updateCoordinates(coordinates[1], coordinates[0]);
      } else {
        // handle situation when coordinates are not found
        console.log("Coordinates not found");
      }
    });
  }, [location]);

  const updateCoordinates = (latitude, longitude) => {
    setCoordinates({ latitude, longitude });
  };

  const fetchGeoCode = async (location) => {
    // const response = await fetch(
    //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    //     location
    //   )}.json?access_token=${mapboxToken}`
    // );

    // const data = await response.json();
    const data =
      location.toLowerCase() === chicagoData.query[0] ? chicagoData : null;
    if (data.features && data.features.length > 0) {
      return data.features[0].center;
    } else {
      return null;
    }
  };

  return (
    <div>
      <Row>
        <Col md={1}>
          <SideBar />
        </Col>
        <Col md={3}>
          <GPTSummaryComponent />
        </Col>
        <Col md={8}>
          <AirQualityComponent />
          <DailyTemperatureComponent
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
        </Col>
      </Row>
      {/* Other components, passing the location as a prop if necessary */}
    </div>
  );
};

export default WeatherDashboard;

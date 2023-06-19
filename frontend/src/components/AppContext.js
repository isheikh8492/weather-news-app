// in a new file, for example, AppContext.js
import React from "react";

const WeatherDataContext = React.createContext({
  coordinates: { latitude: null, longitude: null },
  setCoordinates: () => {},
});

export default WeatherDataContext;

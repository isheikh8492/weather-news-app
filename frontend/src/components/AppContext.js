// in a new file, for example, AppContext.js
import React from "react";

export const WeatherDataContext = React.createContext({
  data: {
    latitude: null,
    longitude: null,
    name: null,
    admin1: null,
    country: null,
    countryCode: null,
    timezone: null,
  },
  setData: () => {},
});

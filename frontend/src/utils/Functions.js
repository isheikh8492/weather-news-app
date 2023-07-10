export const estimateWindSpeed = (speed) => {
  let description;
  switch (true) {
    case 0:
      description = "Calm";
      break;
    case speed >= 1 && speed <= 3:
      description = "Light Air";
      break;
    case speed >= 4 && speed <= 7:
      description = "Light Breeze";
      break;
    case speed >= 8 && speed <= 12:
      description = "Gentle Breeze";
      break;
    case speed >= 13 && speed <= 18:
      description = "Moderate Breeze";
      break;
    case speed >= 19 && speed <= 24:
      description = "Fresh Breeze";
      break;
    case speed >= 25 && speed <= 31:
      description = "Strong Breeze";
      break;
    case speed >= 32 && speed <= 38:
      description = "Near Gale";
      break;
    case speed >= 39 && speed <= 46:
      description = "Gale";
      break;
    case speed >= 47 && speed <= 54:
      description = "Strong Gale";
      break;
    case speed >= 55 && speed <= 63:
      description = "Whole Gale";
      break;
    case speed >= 64 && speed <= 75:
      description = "Storm Force";
      break;
    case speed > 75:
      description = "Hurricane Force";
      break;
    default:
      description = "Calm";
      break;
  }
  return description;
};

export const getPressure = (hPa) => {
  let description;
  switch (true) {
    case hPa > 1023.25:
      description = "High";
      break;
    case hPa >= 1009.14 && hPa <= 1023.25:
      description = "Normal";
      break;
    case hPa < 1009.14:
      description = "Low";
      break;
    default:
      description = "Normal";
      break;
  }
  return description;
};

export const getAirQuality = (so2, no2, uvIndex, o3) => {
  let so2Normalized = so2 / 20;
  let no2Normalized = no2 / 40;
  let uvNormalized = uvIndex / 5;
  let o3Normalized = o3 / 100;

  let maxNormalizedValue = Math.max(
    so2Normalized,
    no2Normalized,
    uvNormalized,
    o3Normalized
  );
  let qualityOfAir = "";

  switch (true) {
    case maxNormalizedValue <= 2:
      qualityOfAir = "Good";
      break;
    case maxNormalizedValue > 2 && maxNormalizedValue <= 4:
      qualityOfAir = "Fair";
      break;
    case maxNormalizedValue > 4 && maxNormalizedValue <= 10:
      qualityOfAir = "Moderate";
      break;
    case maxNormalizedValue > 10:
      qualityOfAir = "Poor";
      break;
    default:
      qualityOfAir = "Good";
      break;
  }

  return qualityOfAir;
};

export const weatherIcon = (weathercode) => {
  let iconString = "";
  if (weathercode >= 0 && weathercode <= 1) {
    iconString = "clear-day";
  } else if (weathercode === 2) {
    iconString = "cloudy";
  } else if (weathercode === 3) {
    iconString = "overcast-day";
  } else if (weathercode >= 4 && weathercode < 51) {
    iconString = "fog-day";
  } else if (weathercode >= 51 && weathercode <= 57) {
    iconString = "drizzle";
  } else if (weathercode >= 58 && weathercode <= 67) {
    iconString = "rain";
  } else if (weathercode >= 68 && weathercode <= 79) {
    iconString = "snow";
  } else if (weathercode >= 80 && weathercode <= 82) {
    iconString = "rain";
  } else if (weathercode >= 83 && weathercode <= 86) {
    iconString = "sleet";
  } else if (weathercode === "95 *") {
    iconString = "thunderstorms-day";
  } else if (weathercode === "99 *") {
    iconString = "thunderstorms-day-snow";
  } else {
    iconString = "thunderstorms-day-rain";
  }
  return iconString;
};

export const convertTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const adjustedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const amPm = hours >= 12 ? "PM" : "AM";

  return `${adjustedHours}${minutes === 0 ? "" : `:${minutes}`} ${amPm}`;
};

export const getWeatherIcon = async (weathercode) => {
  let iconString = "";
  if (weathercode >= 0 && weathercode <= 1) {
    iconString = "clear-day";
  } else if (weathercode === 2) {
    iconString = "cloudy";
  } else if (weathercode === 3) {
    iconString = "overcast-day";
  } else if (weathercode >= 4 && weathercode < 51) {
    iconString = "fog-day";
  } else if (weathercode >= 51 && weathercode <= 57) {
    iconString = "drizzle";
  } else if (weathercode >= 58 && weathercode <= 67) {
    iconString = "rain";
  } else if (weathercode >= 68 && weathercode <= 79) {
    iconString = "snow";
  } else if (weathercode >= 80 && weathercode <= 82) {
    iconString = "rain";
  } else if (weathercode >= 83 && weathercode <= 86) {
    iconString = "sleet";
  } else if (weathercode === "95 *") {
    iconString = "thunderstorms-day";
  } else if (weathercode === "99 *") {
    iconString = "thunderstorms-day-snow";
  } else {
    iconString = "thunderstorms-day-rain";
  }
  try {
    const module = await import(`../assets/${iconString}.svg`);
    return module.default;
  } catch (e) {
    console.error(e);
    return ""; // or some default icon
  }
};

export const convertDate = (time) => {
  const date = new Date(time);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  const strDate = date.toLocaleDateString("en-GB", options);
  return strDate;
};

export const convertDayName = (time) => {
  const date = new Date(time);
  const options = { weekday: "long" };
  const dayName = date.toLocaleDateString("en-US", options);
  return dayName;
};

export const convertGraphTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const adjustedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours; // Converts to 12 hour format
  const amPm = hours >= 12 ? "PM" : "AM";

  return `${adjustedHours}${minutes === 0 ? "" : `:${minutes}`}${amPm}`;
};

export const convertLocalTime = (time) => {
  let hours = time.hours();
  const minutes = time.minutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours ? (hours < 10 ? ` ${hours}` : hours) : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
};

export const formatDate = (time) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const day = time.date();
  const relevantDigits = day < 30 ? day % 20 : day % 30;
  const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
  return `${time.format("dddd")}, ${day}${suffix} ${time.format("MMMM YYYY")}`;
};

export const roundTemperature = (temperature) => {
  return Math.round(temperature);
};

export const getCurrentLocalIndex = (timeData) => {
  const now = new Date();
  const localDateTime = now.toISOString().slice(0, 16);
  const closestTimeIndex = timeData.findIndex((time) => time >= localDateTime);
  if (closestTimeIndex === -1) return timeData.length - 1;
  return closestTimeIndex;
};

export const getNewsDate = (time) => {
  const moment = require("moment");
  const date = moment(time);
  return date.format("MMMM D, YYYY");
};

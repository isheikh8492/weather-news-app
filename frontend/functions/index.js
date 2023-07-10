import { getCurrentLocalIndex } from "../src/utils/Functions";

const cron = require("node-cron");
const admin = require("firebase-admin");
const moment = require("moment-timezone"); // make sure to install this package
const OpenAI = require("openai");
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);
admin.initializeApp();

const getUsers = async () => {
  const usersSnapshot = await admin.firestore().collection("users").get();
  const users = [];
  usersSnapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
  return users;
};

// Add your getLocations function here, similar to getUsers function
const getLocations = async () => {
  const usersSnapshot = await admin.firestore().collection("locations").get();
  const locations = [];
  usersSnapshot.forEach((doc) => locations.push({ id: doc.id, ...doc.data() }));
  return locations;
};

const fetchWeatherData = async (latitude, longitude, timezone) => {
  const docRef = admin.firestore().doc(`weatherData/${latitude}_${longitude}`);
  const docSnap = await docRef.get();

  if (
    docSnap.exists &&
    docSnap.data().date === new Date().toISOString().slice(0, 10) &&
    docSnap.data().timeIndex ===
      getCurrentLocalIndex(docSnap.data().data.hourly.time)
  ) {
    console.log("WeatherData read from Firebase");
    return docSnap.data().data;
  } else {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=7&timezone=${timezone}`
    );
    const newData = await response.json();

    // Overwrite the existing document with new data in Firestore
    await docRef.set({
      date: new Date().toISOString().slice(0, 10),
      timeIndex: getCurrentLocalIndex(newData.hourly.time),
      data: newData,
    });

    return newData;
  }
};

const fetchAirQualityData = async (latitude, longitude, timezone) => {
  const docRef = admin
    .firestore()
    .doc(`airQualityData/${latitude}_${longitude}`);
  const docSnap = await docRef.get();

  if (
    docSnap.exists &&
    docSnap.data().date === new Date().toISOString().slice(0, 10) &&
    docSnap.data().timeIndex ===
      getCurrentLocalIndex(docSnap.data().data.hourly.time)
  ) {
    console.log("AirQuality read from Firebase");
    return docSnap.data().data;
  } else {
    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index&timezone=${timezone}`
    );
    const newData = await response.json();

    // Overwrite the existing document with new data in Firestore
    await docRef.set({
      date: new Date().toISOString().slice(0, 10),
      timeIndex: getCurrentLocalIndex(newData.hourly.time),
      data: newData,
    });

    return newData;
  }
};

const cacheData = async (latitude, longitude, weatherData, airQualityData) => {
  const weatherDocRef = admin
    .firestore()
    .doc(`weatherData/${latitude}_${longitude}`);
  const airQualityDocRef = admin
    .firestore()
    .doc(`airQualityData/${latitude}_${longitude}`);

  // Write the weather data to Firestore.
  await weatherDocRef.set({
    date: new Date().toISOString().slice(0, 10),
    timeIndex: getCurrentLocalIndex(weatherData.hourly.time),
    data: weatherData,
  });

  // Write the air quality data to Firestore.
  await airQualityDocRef.set({
    date: new Date().toISOString().slice(0, 10),
    timeIndex: getCurrentLocalIndex(airQualityData.hourly.time),
    data: airQualityData,
  });
};

const generateSummary = async (data, weatherData, airQualityData, timezone) => {
  // We assume that `weatherData` and `airQualityData` contain the same structure
  // as the `hourlyData` and `hourlyDataUnits` in the original component
  const hourlyData = weatherData.hourly; // or whatever structure you have
  const hourlyDataUnits = airQualityData.hourly; // or whatever structure you have

  const prompt = `${hourlyData}\n\n${hourlyDataUnits}\n\nReturn a summary of the weather in ${
    data.name
  }, ${data.admin1 ? data.admin1 + ", " : ""}${data.country}
      situated at coordinates(${data.latitude}, ${
    data.longitude
  }) in 3 sentences, NO MORE THAN THAT. Use the data provided above to write the summary.
      The summary should start with "The weather in ${data.name}, ${
    data.admin1 ? data.admin1 + ", " : ""
  }${data.country} is". You should also include the state or province
      of the city at the starting sentence if possible. The summary should end with a period.`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const summary = response.data.choices[0].text;

  // Save the summary to Firebase
  const summaryDocRef = admin
    .firestore()
    .doc(`summaries/${data.latitude}_${data.longitude}`);
  await summaryDocRef.set({
    name: data.name,
    admin1: data.admin1,
    country: data.country,
    timezone: timezone,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    localTime: moment().tz(timezone).format(),
    summary: summary,
  });

  return summary;
};

const sendMessage = async (phoneNumber, summary) => {
  //...
};

const scheduleJobs = async () => {
  const users = await getUsers();
  const locations = await getLocations();

  for (const user of users) {
    const userTimezone = user.timezone;
    const runTime = moment().tz(userTimezone).startOf("day").add(1, "day");

    const job = cron.schedule(
      runTime.format("m H D M *"),
      async () => {
        const location = locations.find(
          (location) => location.name === user.name
        );

        // fetch and cache the air quality and weather data at midnight in the city's local timezone
        const weatherData = await fetchWeatherData(
          location.latitude,
          location.longitude,
          userTimezone
        );
        const airQualityData = await fetchAirQualityData(
          location.latitude,
          location.longitude,
          userTimezone
        );

        const summary = generateSummary(weatherData, airQualityData);

        // cache the data
        await cacheData(user.id, weatherData, airQualityData);

        // send the summary
        await sendMessage(user.phoneNumber, summary);

        job.stop(); // stop this job after running once
      },
      {
        scheduled: true,
        timezone: userTimezone,
      }
    );

    job.start(); // start the job
  }
};

scheduleJobs();

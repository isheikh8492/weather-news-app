import React, { useEffect, useState } from "react";
import "../css/modules/CitySummary.css";
import { Configuration, OpenAIApi } from "openai";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import moment from "moment-timezone";

const CitySummary = ({ data, hourlyData, hourlyDataUnits }) => {
  const [summary, setSummary] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const loadSummary = async () => {
    console.log(process.env.REACT_APP_OPENAI_API_KEY);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${hourlyData}\n\n${hourlyDataUnits}\n\nReturn a summary of the weather in ${
        data.name
      }, ${data.admin1 ? data.admin1 + ", " : ""}, ${data.country}
        situated at coordinates(${data.latitude}, ${
        data.longitude
      }) in 3 sentences, NO MORE THAN THAT. Use the data provided above to write the summary.
        The summary should start with "The weather in ${data.name}, ${
        data.admin1 ? data.admin1 + ", " : ""
      }${data.country} is". You should also include the state or province
        of the city at the starting sentence if possible. The summary should end with a period.`,
      temperature: 1,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const summary = response.data.choices[0].text;

    // Save the data to Firebase
    const docRef = doc(db, "summaries", `${data.latitude}_${data.longitude}`);
    await setDoc(docRef, {
      name: data.name,
      admin1: data.admin1,
      country: data.country,
      timezone: data.timezone,
      timestamp: serverTimestamp(),
      localTime: moment().tz(data.timezone).format(),
      summary,
    });

    setSummary(summary);
  };

  useEffect(() => {
    const checkSummary = async () => {
      const docRef = doc(db, "summaries", `${data.latitude}_${data.longitude}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const localTime = moment.tz(data.localTime, data.timezone);
        const currentTime = moment.tz(new Date(), data.timezone);

        if (localTime.isSame(currentTime, "day")) {
          // If it's the same day, use cached summary
          console.log("cached summary used from firebase");
          setSummary(data.summary);
        } else {
          // If it's not the same day, fetch new summary and save it to Firestore
          loadSummary();
        }
      } else {
        loadSummary();
      }
    };

    checkSummary();
  }, [data, hourlyData, hourlyDataUnits]);

  return (
    <div className="city-summary-box">
      <span className="city-summary-text">{summary}</span>
    </div>
  );
};

export default CitySummary;

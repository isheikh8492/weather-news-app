import React, { useEffect, useState } from "react";
import "../css/modules/CitySummary.css";
import { Configuration, OpenAIApi } from "openai";

const CitySummary = ({
  coordinates,
  hourlyData,
  hourlyDataUnits,
  cityCountry,
  cityName,
}) => {
  const [summary, setSummary] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // useEffect(() => {
  //   const loadSummary = async () => {
  //     const response = await openai.createCompletion({
  //       model: "text-davinci-003",
  //       prompt: `${hourlyData}\n\n${hourlyDataUnits}\n\nReturn a summary of the weather in ${cityName}, ${cityCountry}
  //         situated at coordinates(${coordinates}) in 3-4 sentences. Use the data provided above to write the summary.
  //         The summary should start with "The weather in ${cityName}, ${cityCountry} is". You should also include the state or province
  //         of the city at the starting sentence if possible. The summary should end with a period.`,
  //       temperature: 1,
  //       max_tokens: 100,
  //       top_p: 1.0,
  //       frequency_penalty: 0.0,
  //       presence_penalty: 0.0,
  //     });
  //     console.log(response.data);
  //     setSummary(response.data.choices[0].text);
  //   };
  //   loadSummary();
  // }, []);

  return (
    <div className="city-summary-box">
      {/* <span className="city-summary-text">{summary}</span> */}
      <span className="city-summary-text">
        The weather in Chicago, US is mostly cloudy with a temperature of 34°F,
        humidity of 31%, and wind speed of 5mph from the east. Wind gusts are
        expected to reach up to 8mph. The day will be mostly cloudy with some
        sun appearing this afternoon. Rain showers are also expected in the area
        throughout the day.
      </span>
    </div>
  );
};

export default CitySummary;

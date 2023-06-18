import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DailyTemperatureComponent = ({ latitude, longitude }) => {
  const [startDate, setStartDate] = React.useState(new Date() - 7);
  const [endDate, setEndDate] = React.useState(new Date());

  //api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&start_date=2023-06-10&end_date=2023-06-24&timezone=America%2FChicago

  https: return <div>{/* <Line data={data} options={options} /> */}</div>;
};

export default DailyTemperatureComponent;

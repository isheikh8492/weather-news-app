import React from "react";
import "../css/modules/TodayTemperatureGraph.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { convertDate, convertGraphTime } from "../utils/Functions";

const TodayTemperatureGraph = ({ time, temperature, temperatureUnit }) => {
  if (!time || !temperature) return null;
  const convertedTime = time.map((t) => convertGraphTime(t));
  const convertedDate = convertDate(time[0]);
  const convertedAfterDate = convertDate(time[time.length - 1]);
  const data = {
    labels: convertedTime,
    datasets: [
      {
        label: `Temperature (${temperatureUnit})`,
        data: temperature,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",

        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          color: "rgb(75, 192, 192)",
          display: true,
          text: `Time (24-Hour | ${convertedDate} - ${convertedAfterDate})`,
        },
        ticks: {
          color: "rgb(75, 192, 192)",
        },
      },
      y: {
        title: {
          color: "rgb(75, 192, 192)",
          display: true,
          text: `Temperature (${temperatureUnit})`,
        },
        ticks: {
          color: "rgb(75, 192, 192)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} ${temperatureUnit}`,
        },
      },
    },
  };

  return (
    <div className="summary-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default TodayTemperatureGraph;

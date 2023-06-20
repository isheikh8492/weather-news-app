import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

const DailyTemperatureComponent = (coordinates) => {
  const getFormattedDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + "-" + month + "-" + day;
  };

  const currentDate = new Date();
  const weekBackDate = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const [startDate, setStartDate] = useState(getFormattedDate(weekBackDate));
  const [endDate, setEndDate] = useState(getFormattedDate(currentDate));

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [chartData, setChartData] = useState(null);
  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}`
        );
        const weatherData = await response.json();

        if (weatherData && weatherData.daily) {
          const formattedData = {
            labels: weatherData.daily.time,
            datasets: [
              {
                label: "Max Temperature",
                data: weatherData.daily.temperature_2m_max,
                fill: false,
                borderColor: "red",
              },
              {
                label: "Min Temperature",
                data: weatherData.daily.temperature_2m_min,
                fill: false,
                borderColor: "blue",
              },
            ],
          };
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate, timezone]);

  return (
    <div>
      {chartData ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default DailyTemperatureComponent;

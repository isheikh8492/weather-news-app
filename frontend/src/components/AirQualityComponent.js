import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";

const AirQualityComponent = (coordinates) => {
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
          unit: "hour",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Air Quality",
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,dust,uv_index&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}`
        );
        const weatherData = await response.json();
        console.log(weatherData);

        if (weatherData && weatherData.daily) {
          const formattedData = {
            labels: weatherData.hourly.time,
            datasets: [
              {
                label: "Carbon Monoxide",
                data: weatherData.hourly.carbon_monoxide,
                fill: false,
                borderColor: "red",
              },
              {
                label: "Nitrogen Dioxide",
                data: weatherData.hourly.nitrogen_dioxide,
                fill: false,
                borderColor: "blue",
              },
              {
                label: "Sulphur Dioxide",
                data: weatherData.hourly.sulphur_dioxide,
                fill: false,
                borderColor: "green",
              },
              {
                label: "Dust",
                data: weatherData.hourly.dust,
                fill: false,
                borderColor: "yellow",
              },
              {
                label: "UV Index",
                data: weatherData.hourly.uv_index,
                fill: false,
                borderColor: "purple",
              },
            ],
          };
          setChartData(formattedData);
          console.log(chartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate, timezone]);
  return (
    <div>{chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}</div>
  );
};

export default AirQualityComponent;

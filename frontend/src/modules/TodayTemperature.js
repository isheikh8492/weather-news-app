import React from "react";
import { Card as MuiCard, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { blue } from "@mui/material/colors";
import "./TodayTemperature.css";

// const Card = styled(MuiCard)({
//   width: "100%", // or specify a fixed value e.g., "300px"
//   height: "100%", // or specify a fixed value e.g., "200px"
//   minWidth: 275,
//   backgroundColor: blue[50],
//   borderColor: blue[500],
//   color: blue[700],
//   marginBottom: "20px",
//   padding: "16px", // you can adjust this value to provide more or less padding
// });

const TodayTemperature = () => {
  return (
    <div className="summary-container">
      <div className="summary-box">Today's Temperature</div>
    </div>
  );
};

export default TodayTemperature;

import React from "react";
import { Card as MuiCard, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { blue } from "@mui/material/colors";

const TemperatureForecast = () => {
  return (
    <div className="summary-container">
      <div className="summary-box">Today's Temperature</div>
    </div>
  );
};

export default TemperatureForecast;

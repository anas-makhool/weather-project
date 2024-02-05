import "./App.css";
// React
import { useState, useEffect, useRef } from "react";

// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
// Others
import axios from "axios";
import moment from "moment"; // fro date and time
import "moment/min/locales"; // fro date and time
import { useTranslation } from "react-i18next";

// Components
import WeatherBox from "./components/WeatherBox";

const theme = createTheme({
  typography: {
    fontFamily: "IBM, sans-serif",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* Content Container */}
        <Container maxWidth="sm">
          <WeatherBox/>
        </Container>
        {/*== Content Container ==*/}
      </ThemeProvider>
    </div>
  );
}

export default App;
// IBM Plex Sans Arabic

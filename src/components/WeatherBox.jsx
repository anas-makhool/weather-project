import * as React from "react";
import "../App.css";
// React
import { useState, useEffect, useRef } from "react";

// Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
// Others
import axios from "axios";
import moment from "moment"; // fro date and time
import "moment/min/locales"; // fro date and time
import { useTranslation } from "react-i18next";

// Components
import ErrorHandling from "./ErrorHandling";




export default function WeatherBox() {
  const { t, i18n } = useTranslation();
  console.log(t("hello world"));

  const centerFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  // States //
  const [temp, setTemp] = useState({
    currentTemp: 0,
    minTemp: 0,
    maxTemp: 0,
    description: "",
    icon: "",
    countryName: "",
  });
  const [timeAndDate, setTimeAndDate] = useState("");
  const [local, setLocal] = useState(window.localStorage.getItem("i18nextLng"));
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //=== States === //

  // Event Handlers
  const handleLanguageClick = () => {
    if (local === "en") {
      setLocal("ar");
      moment.locale("ar");
      i18n.changeLanguage("ar");
    } else {
      setLocal("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    }
    setTimeAndDate(moment().format("dddd DD MM YYYY"));
  };

  moment.locale(local); // fro date and time

  //==== Event Handlers ===

  const weatherData =
    "https://api.openweathermap.org/data/2.5/weather?lat=32.311927&lon=35.02658399999996&appid=e7e1a37606465a6edb07c73c38ec905d";

  let cancelAxios = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(local);
    setTimeAndDate(moment().format("dddd DD MM YYYY"));
    axios
      .get(weatherData, {
        cancelToken: new axios.CancelToken((clean) => {
          // todo
          cancelAxios.current = clean;
        }),
      })
      .then((response) => {
        console.log(response);
        setTemp({
          currentTemp: Math.round(response.data.main.temp - 273.15),
          minTemp: Math.round(response.data.main.temp_min - 273.15),
          maxTemp: Math.round(response.data.main.temp_max - 273.15),
          description: response.data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          countryName: response.data.name,
        });
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.message);
      });

    return () => {
      // todo
      console.log(`canceling`);
      cancelAxios.current();
    };
  }, [local, i18n]);
  //
  let direction = local === "ar" ? "rtl" : "ltr";
  return (
    <>
      <div
        style={{
          height: "100vh",
          ...centerFlex,
          flexDirection: "column",
        }}>
        {/* Card */}
        <di
          style={{
            background: "rgb(28 52 91 / 26%)",
            color: "white",
            padding: "10px",
            borderRadius: "15px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
          }}>
          {/* Content */}
          {error ? (
            <ErrorHandling>{errorMessage}</ErrorHandling>
          ) : (
            <div>
              {/* City & Time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                }}
                dir={direction}>
                <Typography
                  variant="h3"
                  style={{ marginRight: "20px", fontWeight: "600" }}>
                  {t(temp.countryName)}
                </Typography>
                <Typography variant="h5" style={{ marginRight: "20px" }}>
                  {timeAndDate}
                </Typography>
              </div>
              {/*== City & Time ==*/}

              <hr />

              {/* Degree & Description */}

              <Grid
                sx={{ minWidth: "300px", direction: direction }}
                container
                spacing={2}
                justify="space-between"
                alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between">
                    <Typography variant="h1">{temp.currentTemp}</Typography>
                    <img id="wicon" src={temp.icon} alt="Weather icon" />
                  </Box>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginRight: "10px" }}>
                    {t(temp.description)}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    maxWidth="160px"
                    margin="auto">
                    <h5>
                      {t("min")}:{temp.minTemp}
                    </h5>
                    <h5>|</h5>
                    <h5>
                      {t("max")}:{temp.maxTemp}
                    </h5>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="center">
                    <img
                      id="wicon2"
                      src={temp.icon}
                      alt="Weather icon"
                      style={{ width: "200px" }}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/*== Degree & Description ==*/}
            </div>
          )}

          {/*== Content ==*/}
        </di>
        {/*== Card ==*/}

        <div
          dir={direction}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
          }}>
          <Button
            onClick={handleLanguageClick}
            sx={{ color: "white", display: error ? "none" : "block" }}
            variant="text">
            {local === "en" ? "Arabic" : "إنجليزي"}
          </Button>
        </div>
      </div>
    </>
  );
}

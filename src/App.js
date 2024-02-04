import "./App.css";
// React
import { useState, useEffect } from "react";

// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// Others
import axios from "axios";
import moment from "moment"; // fro date and time
import "moment/min/locales"; // fro date and time
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: "IBM, sans-serif",
  },
});

function App() {
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
    "https://api.openweathermap.org/data/2.5/weather?lat=24.774265&lon=46.738586&appid=e7e1a37606465a6edb07c73c38ec905d";

  let cancelAxios = null;

  useEffect(() => {
    i18n.changeLanguage(local);
    setTimeAndDate(moment().format("dddd DD MM YYYY"));
    axios
      .get(weatherData, {
        cancelToken: new axios.CancelToken((clean) => {
          // todo
          cancelAxios = clean;
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
      })
      .catch((error) => console.log(error));

    return () => {
      // todo
      console.log(`canceling`);
      cancelAxios();
    };
  }, []);
  //

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Content Container */}
          <div
            style={{ height: "100vh", ...centerFlex, flexDirection: "column" }}>
            {/* Card */}
            <div
              style={{
                background: "rgb(28 52 91 / 26%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}>
              {/* Content */}
              <div>
                {/* City & Time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                  dir={local === "ar" ? "rtl" : "ltr"}>
                  <Typography
                    variant="h2"
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

                <div
                
                  dir={local === "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "40px",
                    padding: "0 40px",
                  }}>
                  <div className="temp-box">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}>
                      <Typography variant="h1">{temp.currentTemp}</Typography>
                      {/* <CloudIcon style={{ fontSize: "60px" }} /> */}
                      <img id="wicon" src={temp.icon} alt="Weather icon"></img>
                    </div>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "start", marginRight: "10px" }}>
                      {t(temp.description)}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "160px",
                      }}>
                      <h5>
                        {t("min")}:{temp.minTemp}
                      </h5>
                      <p>|</p>
                      <h5>
                        {t("max")}:{temp.maxTemp}
                      </h5>
                    </div>
                  </div>
                  <div className="icon-weather">
                    {/* <CloudIcon sx={{ fontSize: "200px", color: "white" }} /> */}
                    <img id="wicon2" src={temp.icon} alt="Weather icon" style={{width:"200px"}}></img>
                  </div>
                </div>

                {/*== Degree & Description ==*/}
              </div>

              {/*== Content ==*/}
            </div>
            {/*== Card ==*/}

            <div
            dir="rtl"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}>
              <Button
                onClick={handleLanguageClick}
                sx={{ color: "white" }}
                variant="text">
                {local === "en" ? "Arabic" : "إنجليزي"}
              </Button>
            </div>
          </div>
          {/*== Content Container ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
// IBM Plex Sans Arabic

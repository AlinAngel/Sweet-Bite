import { StyledEngineProvider } from "@mui/styled-engine-sc";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E9BCD9",
      theme: "#FEFEFE",
      gradient: "linear-gradient(to top right, #e9bcd9, #ffdfdf)",
      logoBackground: "#f5f5f5",
    },
    secondary: {
      main: "#1A324A",
      theme: "#FEFEFE",
      gradient:
        "linear-gradient(216.46deg, #FFF7F7 0%, #F7E6F1 100%, #F7E6F1 100%)",
    },
    text: {
      primary: "#302C2D",
      secondary: "#FA77AA", // pink
      thirdly: "#FFFFFF",
      menu: "#77275A",
    },
    pagination: {
      main: "#FA77AA",
    },
  },
  typography: {
    fontFamily: ["Lora"].join(","),
    fontStyle: "normal",
    fontWeight: 700,
    allVariants: {
      color: "#302C2D", // цвет для всех вариантов
    },
    h6: {
      fontSize: "16px",
    },
    button: {
      textTransform: "none",
    },
    navElement: {
      fontFamily: ["Lora"].join(","),
      fontStyle: "normal",
      fontSize: "16px",
      margin: "0 10px",
      fontWeight: 500,
      cursor: "pointer",
    },
    title: {
      fontFamily: ["Lora"].join(","),
      fontStyle: "normal",
      fontSize: "28px",
      fontWeight: 500,
    },
    subTitle: {
      fontFamily: ["Lora"].join(","),
      fontSize: "22px",
      fontWeight: 500,
    },
    review: {
      fontFamily: ["Lora"].join(","),
      fontSize: "13px",
      opacity: 0.8,
    },
    notFoundTitle: {
      fontFamily: ["Lora"].join(","),
      fontSize: "22px",
      fontWeight: 500,
      color: "#77275A",
    },
    moreTypes: {
      alignSelf: 'center',
      lineHeight: 0,
      marginBottom: '6px',
      marginTop: '3px',
    }
  },
  components: {
    MuiButton: {
      // изменяем дефолтные стили кнопки "primary"
      variants: [
        {
          props: {
            variant: "primary",
          },
          style: {
            borderRadius: "4px",
            fontSize: "16px",
            backgroundColor: "#fff",
            lineHeight: "20px",
            color: "#FA77AA",
            border: "1px solid #FA77AA",
            "&:hover": {
              background: "#FA77AA",
              color: "white",
            },
          },
        },
      ],
      styleOverrides: {
        sizeLarge: {
          height: "43px",
        },
      },
    },
    MuiTab: {
      root: {
        "&:hover": {
          backgroundColor: "red",
        },
      },
      selected: {
        backgroundColor: "orange",
        // "&:hover": {},
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <App />
        </StyledThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

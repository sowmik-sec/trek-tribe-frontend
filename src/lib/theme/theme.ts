import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2E8B57",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F4A261",
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#1C1C1C",
      secondary: "#666666",
    },
  },

  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontSize: "2.8rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#2E8B57",
          "&:hover": {
            backgroundColor: "#247A4C",
          },
        },
        containedSecondary: {
          backgroundColor: "#F4A261",
          "&:hover": {
            backgroundColor: "#e07b36",
          },
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

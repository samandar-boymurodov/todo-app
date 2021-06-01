import { createMuiTheme } from "@material-ui/core";
import { cyan, teal } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: teal[500],
    },
    background: {
      paper: teal[50],
    },
  },
  typography: {
    h1: {
      fontFamily: "Raleway",
      fontWeight: 400,
      fontSize: "4rem",
      lineHeight: 1,
    },
    h4: {
      fontFamily: "Raleway",
      lineHeight: 1,
      color: "#fff",
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 400,
    },
    h6: {
      color: cyan[900],
      fontFamily: "Raleway",
      fontWeight: 600,
    },
    body1: {
      color: "#fff",
      fontWeight: 400,
    },
    h3: {
      fontWeight: 500,
      fontFamily: "Raleway",
    },
  },
  props: {
    MuiTextField: {
      variant: "outlined",
      InputLabelProps: {
        shrink: true,
      },
    },
  },
  overrides: {
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItem: {
      root: {
        backgroundColor: cyan[300],
      },
    },
    MuiMenuItem: {
      root: {
        "&:hover": {
          backgroundColor: teal[400],
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiInput: {
      root: {
        color: "red",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: teal[200],
      },
    },
    MuiInputLabel: {
      root: {
        color: cyan[500],
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
        "&.MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: cyan[500],
          },
          "&:hover fieldset": {
            borderColor: cyan[500],
          },
          "&.Mui-focused fieldset": {
            borderColor: cyan[600],
          },
        },
      },
      input: {
        color: cyan[600],
      },
    },
  },
});

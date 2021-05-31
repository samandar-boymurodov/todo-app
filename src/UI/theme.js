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
  },
  typography: {
    h1: {
      fontFamily: "Raleway",
      fontWeight: 400,
      fontSize: "4rem",
      lineHeight: 1,
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

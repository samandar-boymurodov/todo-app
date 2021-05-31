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
});

import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  Typography,
  Hidden,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  menu: {
    fill: "#fff",
    fontSize: "2.5rem",
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Hidden smDown>
              <Typography variant="h4">Samandar</Typography>
            </Hidden>
            <Hidden mdUp>
              <IconButton>
                <MenuIcon className={classes.menu} />
              </IconButton>
            </Hidden>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.button}>
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

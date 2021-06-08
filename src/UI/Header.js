import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Hidden,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../store/actions/auth";

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

export default function Header({ handleMenu }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Hidden xsDown>
              <Typography variant="h4">Todo App</Typography>
            </Hidden>
            <Hidden smUp>
              <IconButton onClick={handleMenu}>
                <MenuIcon className={classes.menu} />
              </IconButton>
            </Hidden>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.button}
              disableElevation
              onClick={() => {
                dispatch(logout());
                history.push("/login");
              }}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

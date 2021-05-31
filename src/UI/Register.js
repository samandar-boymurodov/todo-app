import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles((theme) => ({
  lockIcon: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
  },
  form: {
    backgroundColor: "rgb(51, 201, 220, 0.1 )",
    padding: "1.25rem",
    marginBottom: "5rem",
  },
  submitButton: {
    color: "#fff",
    height: "3rem",
    fontFamily: "Raleway",
    fontWeight: 600,
  },
}));

export default function Register() {
  const theme = useTheme();
  const classes = useStyles();

  const matchesSM = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ marginBottom: "1.25rem" }}>
        <Grid container direction="column" alignItems="center">
          <Grid item className={classes.lockIcon}>
            <span>
              <LockOpenIcon style={{ fill: "#fff" }} />
            </span>
          </Grid>
          <Grid item>
            <Typography variant="h1" color="primary">
              Sign up
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        className={classes.form}
        style={{
          width: matchesSM ? "100%" : null,
        }}
      >
        <Grid container direction="column" spacing={1}>
          <Grid
            item
            container
            direction={matchesSM ? "column" : "row"}
            spacing={2}
          >
            <Grid item>
              <TextField
                label="First Name"
                fullWidth={matchesSM ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                fullWidth={matchesSM ? true : false}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField label="Username" fullWidth />
          </Grid>
          <Grid item>
            <TextField label="Email Address" fullWidth />
          </Grid>
          <Grid
            item
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Divider />
          </Grid>
          <Grid item>
            <TextField label="Password" type="password" fullWidth />
          </Grid>
          <Grid item>
            <TextField label="Confirm password" type="password" fullWidth />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

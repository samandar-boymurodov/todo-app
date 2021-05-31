import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles((theme) => ({
  lockIcon: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0.55rem",
    borderRadius: 50,
  },
  form: {
    backgroundColor: "rgb(51, 201, 220, 0.1 )",
    padding: "1.25rem",
    marginBottom: "5rem",
  },
  submitButton: {
    color: "#fff",
    height: "3rem",
  },
}));

export default function Register() {
  const classes = useStyles();

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
      <Grid item className={classes.form}>
        <Grid container direction="column" spacing={1}>
          <Grid item container spacing={2}>
            <Grid item>
              <TextField label="First Name" />
            </Grid>
            <Grid item>
              <TextField label="Last Name" />
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

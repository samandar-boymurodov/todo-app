import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import cyan from "@material-ui/core/colors/cyan";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Enter longer password")
    .max(20, "Enter shorter password")
    .required("Password is required"),
  confirmpassword: yup
    .string("Enter a confirmation password")
    .required("Confirmation password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  username: yup
    .string("Enter your Username")
    .required("Username is required")
    .min(3, "Enter longer Username")
    .max(15, "Enter shorter Username"),
});

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "1.25rem",
  },
  submitButton: {
    color: "#fff",
    height: "3rem",
    fontFamily: "Raleway",
    fontWeight: 600,
  },
}));

function Register({ onAuth }) {
  const theme = useTheme();
  const classes = useStyles();

  const matchesSM = useMediaQuery(theme.breakpoints.down("xs"));
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onAuth(values.username, values.email, values.password);
    },
  });
  return (
    <Grid
      container
      direction={matchesSM ? "column" : "row"}
      alignItems="center"
      justify={matchesSM ? null : "center"}
      style={{
        paddingTop: matchesSM ? "1.5rem" : null,
        backgroundColor: matchesSM ? "rgb(51, 201, 220, 0.1 )" : undefined,
      }}
    >
      <Grid
        item
        style={{
          marginBottom: matchesSM ? "1rem" : undefined,
          marginRight: matchesSM ? undefined : "-2rem",
          marginLeft: matchesSM ? undefined : "-6rem",
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h1"
              color="secondary"
              style={{ transform: matchesSM ? null : "rotate(-90deg)" }}
            >
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
          backgroundColor: !matchesSM ? "rgb(51, 201, 220, 0.1 )" : undefined,
          marginLeft: matchesSM ? undefined : "-2rem",
          height: matchesSM ? undefined : "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          direction="column"
          spacing={3}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item>
            <TextField
              label="Username"
              name="username"
              id="username"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email Address"
              name="email"
              id="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              name="password"
              id="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Confirm password"
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              fullWidth
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmpassword &&
                Boolean(formik.errors.confirmpassword)
              }
              helperText={
                formik.touched.confirmpassword && formik.errors.confirmpassword
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="secondary">
              If you are already signup up, then you can{" "}
              <Link to="/login" style={{ color: cyan[500] }}>
                login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password) =>
      dispatch(actions.register(username, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Register);

import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import CircularProgress from "@material-ui/core/CircularProgress";
import teal2 from "../assets/teal2.jpg";

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
});

const useStyles = makeStyles((theme) => ({
  submitButton: {
    color: "#fff",
    height: "3rem",
    fontFamily: "Raleway",
    fontWeight: 600,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: `url("${teal2}")`,
    [theme.breakpoints.down("xs")]: {
      backgroundImage: "none",
      backgroundColor: "rgb(51, 201, 220, 0.1 )",
    },
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  formItem: {
    marginBottom: "1.5rem",
  },
  itemsContainer: {
    width: 420,
    boxSizing: "border-box",
    padding: "2rem",
    boxShadow: theme.shadows[5],
    backgroundColor: teal[50],
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "1rem",
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
}));

function Register({ onAuth, loading, isAuth }) {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      history.push("/dashboard");
    }
  }, [isAuth]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onAuth(values.email, values.password);
    },
  });
  return (
    <Grid
      container
      direction="column"
      component="form"
      onSubmit={formik.handleSubmit}
      className={classes.formContainer}
    >
      <div className={classes.itemsContainer}>
        <Grid item container justify="center">
          <Typography
            variant="h1"
            color="secondary"
            className={classes.formItem}
          >
            Sign up
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Email address"
            name="email"
            id="email"
            type="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            className={classes.formItem}
          />
        </Grid>
        <Grid item>
          <Divider className={classes.formItem} />
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
            className={classes.formItem}
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
            className={classes.formItem}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submitButton}
            disabled={loading}
          >
            {loading ? <CircularProgress color="primary" /> : "Submit"}
          </Button>
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <Typography variant="body1" color="secondary">
            If you have already signed up, then you can{" "}
            <Link to="/login" style={{ color: cyan[500] }}>
              login
            </Link>
          </Typography>
        </Grid>
      </div>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.register(email, password)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: !!state.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import {
  Grid,
  TextField,
  Button,
  Hidden,
  useMediaQuery,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import bulb from "../assets/bulb.jpg";
import { Link } from "react-router-dom";
import cyan from "@material-ui/core/colors/cyan";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as actions from "../store/actions/index";
import { useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const validationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(6, "Enter longer password")
    .max(20, "Enter shorter password")
    .required("Password is required"),

  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const useStyles = makeStyles((theme) => ({
  imgBg: {
    backgroundImage: `url("${bulb}")`,
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  submitButton: {
    color: "#fff",
    height: "3rem",
    fontFamily: "Raleway",
    fontWeight: 600,
  },
  lockIcon: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
  },
  formContainer: {
    marginTop: "2.25rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  mainContainer: {
    height: "100vh",
    backgroundColor: "rgb(51, 201, 220, 0.1 )",
  },
  cautionText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
}));

function Login({ onAuth, loading, isAuth }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuth) {
      history.push("/dashboard");
    }
  }, [isAuth]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onAuth(values.email, values.password);
    },
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log("called");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container className={classes.mainContainer} alignItems="center">
      <Hidden xsDown>
        <Grid item xs={false} sm={4} md={7} className={classes.imgBg} />
      </Hidden>
      <Grid item xs={12} sm={8} md={5}>
        <Grid
          container
          direction="column"
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <span className={classes.lockIcon}>
                  <LockOpenIcon style={{ fill: "#fff" }} />
                </span>
              </Grid>
              <Grid item>
                <Typography variant="h1" color="secondary">
                  Sign in
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            className={classes.formContainer}
          >
            <Grid item>
              <TextField
                name="email"
                id="email"
                label="Email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item style={{ marginTop: "1.25rem" }}>
              <TextField
                name="password"
                aria-label="toggle password visibility"
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <Visibility color="primary" />
                        ) : (
                          <VisibilityOff color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item style={{ marginTop: "1.5rem" }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.submitButton}
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress color="primary" /> : "Submit"}
              </Button>
            </Grid>
            <Grid item style={{ marginTop: "1rem" }}>
              <Typography
                variant="body1"
                color="secondary"
                className={classes.cautionText}
              >
                If you are not signed up, then you can{" "}
                <Link to="/register" style={{ color: cyan[500] }}>
                  sign up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.login(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: !!state.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

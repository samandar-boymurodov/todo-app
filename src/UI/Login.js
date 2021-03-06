import {
  Grid,
  TextField,
  Button,
  Hidden,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import teal4 from "../assets/teal4.jpg";

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
    backgroundImage: `url("${teal4}")`,
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
  formContainer: {
    marginTop: "2.25rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  mainContainer: {
    height: "100vh",
    backgroundColor: "rgb(51, 201, 220, 0.1 )",
  },
}));

function Login({ onAuth, loading, isAuth }) {
  const classes = useStyles();
  const history = useHistory();
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
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Todo App | Login</title>
        <meta name="title" content="Todo App | Login" />
        <meta
          name="description"
          content="This is a Todo App created by Boymurodov Samandar. Here you can log in to continue to the dashboard"
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://todo-app-lime-eta.vercel.app/login"
        />
        <meta property="og:title" content="Todo App | Login" />
        <meta
          property="og:description"
          content="This is a Todo App created by Boymurodov Samandar. Here you can log in to continue to the dashboard"
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/CxTFs44T/todo-login.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://todo-app-lime-eta.vercel.app/login"
        />
        <meta property="twitter:title" content="Todo App | Login" />
        <meta
          property="twitter:description"
          content="This is a Todo App created by Boymurodov Samandar. Here you can log in to continue to the dashboard"
        />
        <meta
          property="twitter:image"
          content="https://i.postimg.cc/CxTFs44T/todo-login.png"
        />
      </Helmet>
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
                  type="email"
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
                <Typography variant="body1" color="secondary">
                  If you have not signed up, then you can{" "}
                  <Link to="/register" style={{ color: cyan[500] }}>
                    sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
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

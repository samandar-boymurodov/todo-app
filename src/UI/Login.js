import {
  Grid,
  TextField,
  Button,
  Hidden,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import bulb from "../assets/bulb.jpg";

const validationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(6, "Enter longer password")
    .max(20, "Enter shorter password")
    .required("Password is required"),

  username: yup
    .string("Enter your Username")
    .required("Username is required")
    .min(3, "Enter longer Username")
    .max(15, "Enter shorter Username"),
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
  submitButton: {
    color: "#fff",
    height: "3rem",
    fontFamily: "Raleway",
    fontWeight: 600,
  },
  mainContainer: {
    height: "100vh",
    backgroundColor: "rgb(51, 201, 220, 0.1 )",
  },
}));

export default function Login() {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("xs"));
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
                name="username"
                id="username"
                label="Username or Email"
                fullWidth
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item style={{ marginTop: "1.25rem" }}>
              <TextField
                name="password"
                id="password"
                label="Password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item style={{ marginTop: "1.5rem" }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.submitButton}
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

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
import * as yup from "yup";
import LockOpenIcon from "@material-ui/icons/LockOpen";

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
  firstname: yup
    .string("Enter your Firstname")
    .min(3, "Enter longer Firstname")
    .max(15, "Enter shorter Firstname")
    .required("Firstname is required"),
  lastname: yup
    .string("Enter your Lastname")
    .min(3, "Enter longer Lastname")
    .max(15, "Enter shorter Lastname")
    .required("Lastname is required"),
  username: yup
    .string("Enter your Username")
    .required("Username is required")
    .min(3, "Enter longer Username")
    .max(15, "Enter shorter Username"),
});

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
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
        <Grid
          container
          direction="column"
          spacing={3}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid
            item
            container
            direction={matchesSM ? "column" : "row"}
            spacing={2}
          >
            <Grid item>
              <TextField
                label="First Name"
                name="firstname"
                id="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
                fullWidth={matchesSM ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                name="lastname"
                id="lastname"
                fullWidth={matchesSM ? true : false}
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
          </Grid>
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
        </Grid>
      </Grid>
    </Grid>
  );
}

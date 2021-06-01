import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Slide,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grow,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  deleteGroupTitle: {
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  textField: {
    width: "25rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  descriptionQuestion: {
    color: theme.palette.secondary.main,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ type }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    if (type) {
      setOpen(true);
    }
  }, [type]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = (e) => {
    setCheck((prev) => e.target.checked);
  };

  const deleteGroup = (
    <>
      <DialogContent>
        <Typography
          color="primary"
          variant="h5"
          style={{
            fontFamily: "Raleway",
          }}
          className={classes.deleteGroupTitle}
        >
          Do you really want to delete?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Yes
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </>
  );
  const editGroup = (
    <>
      <DialogContent>
        <TextField
          className={classes.textField}
          label="Enter new name"
          variant="outlined"
          color="primary"
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
  const addTodo = (
    <>
      <DialogContent>
        <Grid container direction="column" justify="center">
          <Grid item>
            <FormControlLabel
              className={classes.descriptionQuestion}
              control={
                <Checkbox
                  checked={check}
                  onChange={handleCheck}
                  name="checkedB"
                  color="primary"
                />
              }
              label={
                <Typography
                  color="primary"
                  variant="h5"
                  style={{
                    fontFamily: "Raleway",
                  }}
                  className={classes.deleteGroupTitle}
                >
                  Add with description?
                </Typography>
              }
            />
          </Grid>
          <Grid item>
            <Grow
              in={check}
              style={{ marginTop: "0.6rem", marginBottom: "0.5rem" }}
            >
              <TextField
                className={classes.textField}
                label="Enter description"
                autoFocus={check}
                variant="outlined"
                color="primary"
                multiline
                rowsMax={4}
              />
            </Grow>
          </Grid>
        </Grid>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Add
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );

  const editTodo = (
    <>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <TextField
              className={classes.textField}
              label="Enter new name"
              variant="outlined"
              color="primary"
              autoFocus
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.textField}
              label="Enter new description"
              variant="outlined"
              color="primary"
              placeholder="This is optional"
              style={{
                marginTop: "1.4rem",
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );

  const deleteTodo = (
    <>
      <DialogContent>
        <Typography
          color="primary"
          variant="h5"
          style={{
            fontFamily: "Raleway",
          }}
          className={classes.deleteGroupTitle}
        >
          Do you really want to delete?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Yes
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </>
  );
  return (
    <Dialog
      PaperProps={{
        classes: {
          root: classes.paper,
        },
        square: true,
      }}
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      {type === "DeleteGroup"
        ? deleteGroup
        : type === "EditGroup"
        ? editGroup
        : type === "AddTodo"
        ? addTodo
        : type === "EditTodo"
        ? editTodo
        : type === "DeleteTodo"
        ? deleteTodo
        : null}
    </Dialog>
  );
};

export default Modal;

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
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  deleteGroupTitle: {
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ type }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
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
  React.useEffect(() => {
    if (type) {
      setOpen(true);
    }
  }, [type]);
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
        : null}
    </Dialog>
  );
};

export default Modal;

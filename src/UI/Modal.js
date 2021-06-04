import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import * as modalTypes from "../store/actions/utils/modalTypes";

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

const Modal = ({
  open,
  onRemoveModal,
  type,
  selectedGroupName,
  onAddTodo,
  onEditGroup,
  selected,
}) => {
  const classes = useStyles();

  const [check, setCheck] = useState(false);
  const [addTodoInfo, setAddTodoInfo] = useState({
    name: "",
    description: "",
    error: "",
  });
  const [newGroupName, setNewGroupName] = useState({
    name: "",
    error: "",
  });

  const handleClose = (e) => {
    if (e.target.innerText !== "ADD" && e.target.innerText !== "SAVE") {
      onRemoveModal();
      setAddTodoInfo({
        name: "",
        description: "",
        error: "",
      });
      setCheck(false);
      setNewGroupName({
        name: "",
        error: "",
      });
      return;
    }
    switch (type) {
      case modalTypes.ADD_TODO:
        if (!addTodoInfo.name) {
          setAddTodoInfo({ ...addTodoInfo, error: "this field is required" });
          return;
        } else {
          if (check && addTodoInfo.description) {
            onAddTodo(selectedGroupName, {
              name: addTodoInfo.name,
              description: addTodoInfo.description,
            });
          } else {
            onAddTodo(selectedGroupName, { name: addTodoInfo.name });
          }
        }
        break;
      case modalTypes.EDIT_GROUP:
        if (!newGroupName.name) {
          setNewGroupName({ ...newGroupName, error: "this field is required" });
          return;
        } else {
          onEditGroup(selected, newGroupName.name);
        }
        break;
      default:
        break;
    }
    onRemoveModal();
    setAddTodoInfo({
      name: "",
      description: "",
      error: "",
    });
    setCheck(false);
    setNewGroupName({
      name: "",
      error: "",
    });
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
          error={!!newGroupName.error}
          helperText={newGroupName.error}
          value={newGroupName.name}
          onChange={(e) =>
            setNewGroupName({
              name: e.target.value,
              error: e.target.value ? "" : newGroupName.error,
            })
          }
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
            <TextField
              className={classes.textField}
              label="Enter a name"
              autoFocus
              variant="outlined"
              color="primary"
              error={!!addTodoInfo.error}
              helperText={addTodoInfo.error}
              onChange={(e) => {
                setAddTodoInfo({
                  ...addTodoInfo,
                  name: e.target.value,
                  error: e.target.value ? "" : addTodoInfo.error,
                });
              }}
              value={addTodoInfo.name}
            />
          </Grid>
          {check ? (
            <Grid item style={{ marginTop: "1rem" }}>
              <Grow in={check}>
                <TextField
                  className={classes.textField}
                  label="Enter a description"
                  autoFocus={check}
                  variant="outlined"
                  color="primary"
                  multiline
                  rowsMax={4}
                  onChange={(e) =>
                    setAddTodoInfo({
                      ...addTodoInfo,
                      description: e.target.value,
                    })
                  }
                  value={addTodoInfo.description}
                />
              </Grow>
            </Grid>
          ) : null}
          <Grid item>
            <FormControlLabel
              className={classes.descriptionQuestion}
              control={
                <Checkbox
                  checked={check}
                  onChange={handleCheck}
                  name="description-check"
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
      {type === modalTypes.DELETE_GROUP
        ? deleteGroup
        : type === modalTypes.EDIT_GROUP
        ? editGroup
        : type === modalTypes.ADD_TODO
        ? addTodo
        : type === modalTypes.EDIT_TODO
        ? editTodo
        : type === modalTypes.DELETE_TODO
        ? deleteTodo
        : null}
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  open: state.modal.open,
  type: state.modal.type,
  selectedGroupName: state.todo.selectedTodoGroup.name,
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveModal: () => dispatch(actions.removeModal()),
  onAddTodo: (name, todoInfo) => dispatch(actions.addTodo(name, todoInfo)),
  onEditGroup: (oldName, newName) =>
    dispatch(actions.editGroup(oldName, newName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

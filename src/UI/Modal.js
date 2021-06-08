import { useState, useEffect, forwardRef } from "react";
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({
  optionIndexTodo,
  optionIndexGroup,
  open,
  onRemoveModal,
  type,
  selectedGroupName,
  onAddTodo,
  onEditGroup,
  onDeleteGroup,
  onEditTodo,
  onDeleteTodo,
  todoGroups,
}) => {
  const classes = useStyles();

  const [check, setCheck] = useState(false);
  const [addTodoInfo, setAddTodoInfo] = useState({
    name: "",
    description: "",
    error: "",
  });
  const [editTodoIndo, setEditTodoInfo] = useState({
    name: "",
    description: "",
    error: "",
  });
  const [newGroupName, setNewGroupName] = useState({
    name: "",
    error: "",
  });

  useEffect(() => {
    if (type === modalTypes.EDIT_GROUP) {
      if (optionIndexGroup) {
        setNewGroupName({
          ...newGroupName,
          name: todoGroups.filter((e) => e.id === optionIndexGroup)[0].name,
        });
      }
    }
  }, [optionIndexGroup]);

  useEffect(() => {
    if (type === modalTypes.EDIT_TODO) {
      const groupIndex = todoGroups.findIndex(
        (e) => e.name === selectedGroupName
      );
      const todoIndex = todoGroups[groupIndex].todos.findIndex(
        (e) => e.id === optionIndexTodo
      );

      setEditTodoInfo({
        ...editTodoIndo,
        name: todoGroups[groupIndex].todos[todoIndex].name,
        description: todoGroups[groupIndex].todos[todoIndex].description,
      });
    }
  }, [optionIndexTodo]);

  const actionTrigger = () => {
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
            onRemoveModal();
          } else {
            onAddTodo(selectedGroupName, { name: addTodoInfo.name });
            onRemoveModal();
          }
        }
        break;
      case modalTypes.EDIT_GROUP:
        if (!newGroupName.name) {
          setNewGroupName({ ...newGroupName, error: "this field is required" });
          return;
        } else {
          onEditGroup(optionIndexGroup, newGroupName.name);
          onRemoveModal();
        }
        break;
      case modalTypes.DELETE_GROUP:
        onDeleteGroup(optionIndexGroup);
        onRemoveModal();
        break;
      case modalTypes.EDIT_TODO:
        if (!editTodoIndo.name) {
          setEditTodoInfo({ ...editTodoIndo, error: "This field is required" });
          return;
        } else {
          onEditTodo(optionIndexTodo, {
            name: editTodoIndo.name,
            description: editTodoIndo.description,
          });
          onRemoveModal();
        }
        break;
      case modalTypes.DELETE_TODO:
        onDeleteTodo(optionIndexTodo);
        onRemoveModal();
        break;
      default:
        break;
    }
  };

  const handleClose = (e) => {
    let buttonText = e.target.innerText;
    if (buttonText !== "ADD" && buttonText !== "SAVE" && buttonText !== "YES") {
      onRemoveModal();
      return;
    }
    actionTrigger();
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      actionTrigger();
    }
  };

  const handleCheck = (e) => {
    setCheck(e.target.checked);
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
          label="Edit name"
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
              label="Edit name"
              variant="outlined"
              color="primary"
              autoFocus
              error={!!editTodoIndo.error}
              helperText={editTodoIndo.error}
              value={editTodoIndo.name}
              onChange={(e) =>
                setEditTodoInfo({
                  ...editTodoIndo,
                  name: e.target.value,
                  error: e.target.value ? "" : editTodoIndo.error,
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.textField}
              label="Edit description"
              variant="outlined"
              color="primary"
              multiline
              rowsMax={4}
              placeholder="This is optional"
              value={editTodoIndo.description}
              onChange={(e) =>
                setEditTodoInfo({
                  ...editTodoIndo,
                  description: e.target.value,
                })
              }
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
      onKeyDown={handleKeyDown}
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
  optionIndexGroup: state.todo.optionIndexGroup,
  optionIndexTodo: state.todo.optionIndexTodo,
  todoGroups: state.todo.todoGroups,
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveModal: () => dispatch(actions.removeModal()),
  onAddTodo: (name, todoInfo) => dispatch(actions.addTodo(name, todoInfo)),
  onEditGroup: (oldName, newName) =>
    dispatch(actions.editGroup(oldName, newName)),
  onDeleteGroup: (index) => dispatch(actions.deleteGroup(index)),
  onEditTodo: (index, editInfo) => dispatch(actions.editTodo(index, editInfo)),
  onDeleteTodo: (index) => dispatch(actions.deleteTodo(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

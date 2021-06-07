import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodoGroup } from "../store/actions/index";

const useStyles = makeStyles((theme) => ({
  addText: {
    fontSize: "1.5rem",
    paddingTop: "14px",
    paddingBottom: "14px",
    fontWeight: 400,
    fontFamily: "Raleway",
  },
  AddArea: {
    position: "absolute",
    width: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    bottom: 0,
  },
  textField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
    },
    backgroundColor: "#fff",
  },
  addGroupButton: {
    height: "100%",
    fontSize: "1.5rem",
    fontWeight: 400,
  },
}));

export const AddGroupArea = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const textRef = useRef();

  const [newGroupTitle, setNewGroupTitle] = useState("");

  const handleGroupTitle = (e) => {
    setNewGroupTitle(e.target.value);
  };

  const onkeydownHandler = (e) => {
    if (e.code === "Enter") {
      if (newGroupTitle) {
        dispatch(addTodoGroup(newGroupTitle));
        setNewGroupTitle("");
      }
    }
  };

  const handleAddButton = () => {
    if (newGroupTitle) {
      dispatch(addTodoGroup(newGroupTitle));
      setNewGroupTitle("");
    }
  };
  return (
    <Grid item container className={classes.AddArea}>
      <Grid item xs={9}>
        <TextField
          inputProps={{
            className: classes.addText,
          }}
          fullWidth
          variant="outlined"
          className={classes.textField}
          placeholder="Add a Group"
          value={newGroupTitle}
          onChange={handleGroupTitle}
          ref={textRef}
          onKeyDown={onkeydownHandler}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          className={classes.addGroupButton}
          onClick={handleAddButton}
        >
          ADD
        </Button>
      </Grid>
    </Grid>
  );
};

import Header from "../UI/Header";
import Modal from "../UI/Modal";
import ToDoGroupContainer from "./ToDoGroupContainer";
import React from "react";
import {
  Grid,
  List,
  ListItem,
  Popper,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  Grow,
  ClickAwayListener,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IsScrolling from "react-is-scrolling";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  todoGroupsContainer: {
    position: "absolute",
    overflow: "auto",
    width: "35%",
    top: 63,
    bottom: 55,
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.light,
    },
  },
  todoGroup: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#fff",
    fontWeight: 300,
  },
  todoGroups: {
    marginTop: "0.1rem",
    marginBottom: "0.1rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#fff",
    },

    color: theme.palette.primary.dark,
  },
  AddArea: {
    position: "absolute",
    width: "35%",
    bottom: 0,
  },
  addText: {
    fontSize: "1.5rem",
    paddingTop: "14px",
    paddingBottom: "14px",
    fontWeight: 400,
    fontFamily: "Raleway",
  },
  addGroupButton: {
    height: "100%",
    fontSize: "1.5rem",
    fontWeight: 400,
  },
  icon: {
    fill: "#fff",
  },
  menuItem: {
    color: "#fff",
    fontWeight: 600,
    fontFamily: "Raleway",
  },
  textField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
    },
  },
}));

const arrays = [...new Array(100).fill("Mnemonics")];

function TodoGroupsContainer({ isScrolling }) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopper, setOpenPopper] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);

  const handlePopper = (index) => (e) => {
    if (isScrolling) {
      return;
    }
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
  };
  const clickOpenPopper = (index) => (e) => {
    e.stopPropagation();
    if (isScrolling) {
      return;
    }
    setOpenPopper((prev) => (prev === index ? false : index));
    setAnchorEl(e.currentTarget);
  };
  const editGroupHandler = (e) => {
    e.stopPropagation();
    setOpenPopper(false);
    setAnchorEl(null);
    setModalType("EditGroup");
  };
  const deleGroupteHandler = (e) => {
    e.stopPropagation();
    setOpenPopper(false);
    setAnchorEl(null);
    setModalType("DeleteGroup");
  };
  const handleClosePopper = () => {
    setOpenPopper(false);
    setAnchorEl(null);
  };
  return (
    <div>
      <Header />
      <div className={classes.toolbarMargin} />
      <Grid container>
        <Grid item container direction="column">
          <Grid item className={classes.todoGroupsContainer}>
            <List>
              {arrays.map((item, index) => (
                <ListItem
                  onMouseLeave={handleClosePopper}
                  key={index}
                  button
                  className={classes.todoGroups}
                  onClick={() => console.log("clicked")}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={10}>
                      <Typography variant="h5" className={classes.todoGroup}>
                        {item}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} container justify="flex-end">
                      <IconButton
                        disableRipple
                        onMouseOver={handlePopper(index)}
                        onClick={clickOpenPopper(index)}
                      >
                        <MoreHorizIcon
                          color="primary"
                          className={classes.icon}
                        />
                      </IconButton>
                      <Popper
                        placement="right-end"
                        style={{ zIndex: theme.zIndex.modal }}
                        open={openPopper === index}
                        anchorEl={anchorEl}
                        onMouseLeave={handleClosePopper}
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin: "bottom center",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener
                                onClickAway={handleClosePopper}
                              >
                                <MenuList id="menu-list-grow">
                                  <MenuItem
                                    onClick={editGroupHandler}
                                    className={classes.menuItem}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    onClick={deleGroupteHandler}
                                    className={classes.menuItem}
                                  >
                                    Delete
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item container className={classes.AddArea}>
            <Grid item xs={9}>
              <TextField
                inputProps={{
                  className: classes.addText,
                }}
                fullWidth
                variant="outlined"
                className={classes.textField}
                placeholder="Add your Todo Group"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                className={classes.addGroupButton}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <ToDoGroupContainer />
        </Grid>
      </Grid>
      <Modal type={modalType} />
    </div>
  );
}

export default IsScrolling(TodoGroupsContainer);

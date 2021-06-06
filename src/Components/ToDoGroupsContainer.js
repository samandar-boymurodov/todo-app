import Header from "../UI/Header";
import Modal from "../UI/Modal";
import ToDoGroupContainer from "./ToDoGroupContainer";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
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
  Hidden,
  Dialog,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { AddGroupArea } from "./AddGroupArea";
import * as modalTypes from "../store/actions/utils/modalTypes";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  todoGroupsContainer: {
    position: "absolute",
    overflow: "auto",
    width: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    top: 63,
    bottom: 55,
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[300],
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.light,
    },
  },
  groupText: {
    color: "#fff",
    fontWeight: 300,
    marginRight: "1.5rem",
    wordWrap: "break-word",
  },
  groupContainer: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#fff",
    },

    color: theme.palette.primary.dark,
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.light,
    },
    "&.Mui-selected:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },

  addText: {
    fontSize: "1.5rem",
    paddingTop: "14px",
    paddingBottom: "14px",
    fontWeight: 400,
    fontFamily: "Raleway",
  },

  icon: {
    fill: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  menuItem: {
    color: "#fff",
    fontWeight: 600,
    fontFamily: "Raleway",
  },

  closeIcon: {
    fill: "#fff",
    fontSize: "2.5rem",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function TodoGroupsContainer({
  isAuth,
  onInit,
  todoGroups,
  selectTodoGroup,
  selectedTodoGroup,
  onModalOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    } else {
      onInit();
    }
  }, [isAuth, onInit]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopper, setOpenPopper] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handlePopper = (index) => (e) => {
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
  };
  const clickOpenPopper = (index) => (e) => {
    setOpenPopper((prev) => (prev === index ? null : index));
    setAnchorEl(e.currentTarget);
  };
  const editGroupHandler = (index) => {
    setOpenPopper(null);
    setAnchorEl(null);
    onModalOpen(modalTypes.EDIT_GROUP);
    setSelected(index);
  };
  const deleGroupteHandler = (index) => {
    setOpenPopper(null);
    setAnchorEl(null);
    onModalOpen(modalTypes.DELETE_GROUP);
    setSelected(index);
  };
  const handleClosePopper = () => {
    setOpenPopper(null);
    setAnchorEl(null);
  };
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <Header handleMenu={handleMenu} />
      <div className={classes.toolbarMargin} />
      <Grid container>
        <Hidden xsDown>
          <Grid item container direction="column">
            <Grid item className={classes.todoGroupsContainer}>
              <List>
                {todoGroups.map((todoGroup, index) => (
                  <div key={index}>
                    <Popper
                      placement="left"
                      style={{ zIndex: theme.zIndex.modal }}
                      open={openPopper === index}
                      anchorEl={anchorEl}
                      onMouseLeave={handleClosePopper}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: "right",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClosePopper}>
                              <MenuList id="menu-list-grow">
                                <MenuItem
                                  onClick={() => editGroupHandler(index)}
                                  className={classes.menuItem}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() => deleGroupteHandler(index)}
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
                    <ListItem
                      onMouseLeave={handleClosePopper}
                      button
                      onClick={() => selectTodoGroup(index, todoGroups)}
                      selected={todoGroup.name === selectedTodoGroup.name}
                      classes={{
                        root: classes.groupContainer,
                      }}
                      divider
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h5"
                            className={classes.groupText}
                          >
                            {todoGroup.name}
                          </Typography>
                        }
                      />

                      <ListItemSecondaryAction>
                        <IconButton
                          disableRipple
                          onMouseOver={handlePopper(index)}
                          onClick={clickOpenPopper(index)}
                        >
                          <MoreHorizIcon className={classes.icon} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                ))}
              </List>
            </Grid>
            <AddGroupArea />
          </Grid>
        </Hidden>
        <Dialog
          open={openMenu}
          TransitionComponent={Transition}
          keepMounted
          fullScreen
        >
          <AppBar color="secondary">
            <Toolbar>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h4">Samandar</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleMenu} disableRipple>
                    <CloseIcon color="primary" className={classes.closeIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid item container direction="column">
            <Grid item className={classes.todoGroupsContainer}>
              <List>
                {todoGroups.map((todoGroup, index) => (
                  <div key={index}>
                    <Popper
                      placement="left"
                      style={{ zIndex: theme.zIndex.modal }}
                      open={openPopper === index}
                      anchorEl={anchorEl}
                      onMouseLeave={handleClosePopper}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: "right",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClosePopper}>
                              <MenuList id="menu-list-grow">
                                <MenuItem
                                  onClick={() => editGroupHandler(index)}
                                  className={classes.menuItem}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() => deleGroupteHandler(index)}
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
                    <ListItem
                      onMouseLeave={handleClosePopper}
                      button
                      onClick={() => selectTodoGroup(index, todoGroups)}
                      classes={{
                        root: classes.groupContainer,
                      }}
                      selected={todoGroup.name === selectedTodoGroup.name}
                      divider
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h5"
                            className={classes.groupText}
                          >
                            {todoGroup.name}
                          </Typography>
                        }
                      />

                      <ListItemSecondaryAction>
                        <IconButton
                          disableRipple
                          onMouseOver={handlePopper(index)}
                          onClick={clickOpenPopper(index)}
                        >
                          <MoreHorizIcon className={classes.icon} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                ))}
              </List>
            </Grid>
            <AddGroupArea />
          </Grid>
        </Dialog>
        <Grid item>
          <ToDoGroupContainer />
        </Grid>
      </Grid>
      <Modal selected={selected} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: !!state.auth.token,
  todoGroups: state.todo.todoGroups,
  selectedTodoGroup: state.todo.selectedTodoGroup,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(actions.initTodos()),
  selectTodoGroup: (index, todoGroups) =>
    dispatch(actions.selectTodoGroup(index, todoGroups)),
  onModalOpen: (type) => dispatch(actions.setModal(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoGroupsContainer);

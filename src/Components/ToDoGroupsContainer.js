import Header from "../UI/Header";
import Modal from "../UI/Modal";
import ToDoGroupContainer from "./ToDoGroupContainer";
import { useEffect, useState, forwardRef } from "react";
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
  InputAdornment,
} from "@material-ui/core";
import { makeStyles, useTheme, color } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ClearIcon from "@material-ui/icons/Clear";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { AddGroupArea } from "./AddGroupArea";
import * as modalTypes from "../store/actions/utils/modalTypes";
import { cyan, teal } from "@material-ui/core/colors";

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
    top: 102,
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
  searchArea: {
    position: "absolute",
    top: 63,
    width: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  searchInput: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {},
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      backgroundColor: fade(cyan[500], 0.2),
      border: "none",
      color: cyan[600],
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
      backgroundColor: teal[300],
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function TodoGroupsContainer({
  isAuth,
  onInit,
  todoGroups,
  selectTodoGroup,
  selectedTodoGroup,
  onModalOpen,
  open,
  onOptionIndexGroup,
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
  }, [isAuth]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopper, setOpenPopper] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult(todoGroups.filter((e) => e.name.includes(searchQuery)));
  }, [searchQuery, todoGroups]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };
  const closeSearchHandler = () => {
    setSearchQuery("");
  };

  const handlePopper = (index) => (e) => {
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
  };
  const clickOpenPopper = (index) => (e) => {
    setOpenPopper((prev) => (prev === index ? null : index));
    setAnchorEl(e.currentTarget);
  };
  const editGroupHandler = (id) => {
    setOpenPopper(null);
    setAnchorEl(null);
    onModalOpen(modalTypes.EDIT_GROUP);
    onOptionIndexGroup(id);
  };
  const deleGroupteHandler = (id) => {
    setOpenPopper(null);
    setAnchorEl(null);
    onModalOpen(modalTypes.DELETE_GROUP);
    onOptionIndexGroup(id);
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
          <Grid item className={classes.searchArea}>
            <TextField
              autoFocus
              value={searchQuery}
              onChange={handleSearchQuery}
              color="primary"
              fullWidth
              placeholder="Search"
              className={classes.searchInput}
              inputProps={{
                style: {
                  padding: "10px 16px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ClearIcon
                      onClick={closeSearchHandler}
                      color="primary"
                      style={{ cursor: "pointer" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item container direction="column">
            <Grid item className={classes.todoGroupsContainer}>
              <List>
                {searchResult.map((todoGroup, index) => (
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
                                  onClick={() => editGroupHandler(todoGroup.id)}
                                  className={classes.menuItem}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    deleGroupteHandler(todoGroup.id)
                                  }
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
                      onClick={() => selectTodoGroup(todoGroup.id, todoGroups)}
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
          <AppBar color="secondary" elevation={0}>
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
            <Grid item className={classes.searchArea}>
              <TextField
                value={searchQuery}
                onChange={handleSearchQuery}
                color="primary"
                fullWidth
                placeholder="Search"
                className={classes.searchInput}
                inputProps={{
                  style: {
                    padding: "10px 16px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ClearIcon
                        onClick={closeSearchHandler}
                        color="primary"
                        style={{ cursor: "pointer" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item className={classes.todoGroupsContainer}>
              <List>
                {searchResult.map((todoGroup, index) => (
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
                                  onClick={() => editGroupHandler(todoGroup.id)}
                                  className={classes.menuItem}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    deleGroupteHandler(todoGroup.id)
                                  }
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
                      onClick={() => {
                        selectTodoGroup(todoGroup.id, todoGroups);
                        setOpenMenu(false);
                      }}
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
      {open ? <Modal /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: !!state.auth.token,
  todoGroups: state.todo.todoGroups,
  selectedTodoGroup: state.todo.selectedTodoGroup,
  open: state.modal.open,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => dispatch(actions.initTodos()),
  selectTodoGroup: (id, todoGroups) =>
    dispatch(actions.selectTodoGroup(id, todoGroups)),
  onModalOpen: (type) => dispatch(actions.setModal(type)),
  onOptionIndexGroup: (id) => dispatch(actions.optionIndexGroup(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoGroupsContainer);

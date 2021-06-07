import { useState, useEffect } from "react";
import { teal, cyan } from "@material-ui/core/colors";
import {
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Divider,
  Fade,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemSecondaryAction,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  Tabs,
  Tab,
  useMediaQuery,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, useTheme } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { CheckBox } from "@material-ui/icons";
import Modal from "../UI/Modal";
import { connect } from "react-redux";
import * as modalTypes from "../store/actions/utils/modalTypes";
import * as actions from "../store/actions/index";

const useStyles = makeStyles((theme) => ({
  groupContainer: {
    position: "absolute",
    width: "65%",
    right: 0,
    bottom: 0,
    top: 63,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  infoContainer: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    margin: "0.3rem 0.5rem",
    boxShadow: theme.shadows[3],
    backgroundColor: cyan[100],
  },
  groupTitle: {
    fontSize: "2.1rem",
    color: theme.palette.secondary.main,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  groupTitleContainer: {
    maxWidth: 300,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.8rem",
      maxWidth: 250,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      maxWidth: 150,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
      maxWidth: 140,
    },
  },
  todos: {
    position: "absolute",
    bottom: 0,
    top: 102,
    width: "100%",
    overflow: "auto",
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
  menuItem: {
    color: "#fff",
    fontWeight: 600,
    fontFamily: "Raleway",
  },
  listItem: {
    backgroundColor: teal[300],
  },
  searchInput: {
    [theme.breakpoints.down("md")]: {
      width: 180,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
    },
  },
  icon: {
    fill: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  listText: {
    wordWrap: "break-word",
    marginRight: "1.5rem",
  },
  closeIcon: {
    cursor: "pointer",
  },
}));

function TodoGroupContainer({
  selectedTodoGroup,
  onModalOpen,
  open,
  onOptionIndexTodo,
  toggleComplete,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [openSearch, setOpenSearch] = useState(false);
  const [checked, setChecked] = useState([]);
  const [openPopper, setOpenPopper] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult(
      selectedTodoGroup.todos.filter(
        (e) =>
          e.name.includes(searchQuery) ||
          (e.description ? e.description.includes(searchQuery) : false)
      )
    );
  }, [searchQuery, selectedTodoGroup]);

  const handlePopper = (index) => (e) => {
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
  };
  const clickOpenPopper = (index) => (e) => {
    setOpenPopper((prev) => (prev === index ? null : index));
    setAnchorEl(e.currentTarget);
  };

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
      setTimeout(() => {
        toggleComplete(id, selectedTodoGroup.name);
      }, 50);
    } else {
      newChecked.splice(currentIndex, 1);
      setTimeout(() => {
        toggleComplete(id, selectedTodoGroup.name);
      }, 50);
    }

    setChecked(newChecked);
  };
  const editTodoHandler = (id) => {
    setOpenPopper(null);
    setAnchorEl(null);
    onModalOpen(modalTypes.EDIT_TODO);
    onOptionIndexTodo(id);
  };
  const deleteTodoHandler = (id) => {
    setOpenPopper(null);
    setAnchorEl(null);
    onModalOpen(modalTypes.DELETE_TODO);
    onOptionIndexTodo(id);
  };
  const handleClosePopper = () => {
    setOpenPopper(null);
    setAnchorEl(null);
  };
  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };
  const closeSearchHandler = () => {
    setOpenSearch(false);
    setSearchQuery("");
  };

  const todos =
    tab === "todos"
      ? searchResult.filter((e) => !e.completed)
      : searchResult.filter((e) => e.completed);

  return (
    <>
      <Grid container direction="column" className={classes.groupContainer}>
        <Paper square className={classes.infoContainer}>
          {/*--- ToolBar ---*/}
          <Grid container direction="column">
            <Grid item style={{ height: 50 }}>
              {openSearch && matchesXS ? (
                <TextField
                  className={classes.searchInput}
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchQuery}
                  inputProps={{
                    style: {
                      padding: "8.5px 5px",
                    },
                  }}
                  style={{ marginTop: 10 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CloseIcon
                          className={classes.closeIcon}
                          onClick={closeSearchHandler}
                          color="primary"
                        />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Type to search"
                />
              ) : null}

              <Grid container alignItems="center" style={{ height: "100%" }}>
                {!(openSearch && matchesXS) ? (
                  <Grid item className={classes.groupTitleContainer}>
                    <Typography variant="h3" className={classes.groupTitle}>
                      {selectedTodoGroup.name}
                    </Typography>
                  </Grid>
                ) : null}
                {selectedTodoGroup.name ? (
                  <Grid
                    item
                    container
                    xs
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      {!openSearch ? (
                        <IconButton
                          onClick={() => setOpenSearch(true)}
                          disableRipple
                        >
                          <SearchIcon color="secondary" />
                        </IconButton>
                      ) : !(openSearch && matchesXS) ? (
                        <TextField
                          className={classes.searchInput}
                          autoFocus
                          value={searchQuery}
                          onChange={handleSearchQuery}
                          inputProps={{
                            style: {
                              padding: "8.5px 5px",
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CloseIcon
                                  className={classes.closeIcon}
                                  onClick={closeSearchHandler}
                                  color="primary"
                                />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Type to search"
                        />
                      ) : null}
                    </Grid>

                    {!(matchesSM && openSearch) ? (
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ color: "#fff", boxShadow: "none" }}
                          onClick={() => onModalOpen(modalTypes.ADD_TODO)}
                        >
                          Add todo
                        </Button>
                      </Grid>
                    ) : null}
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            <Divider />
            <Grid item container justify={matchesXS ? "center" : null}>
              <Tabs onChange={handleTabChange} value={tab}>
                <Divider orientation="vertical" flexItem />
                <Tab
                  disableTouchRipple
                  value="todos"
                  label={
                    <Typography variant="body1" color="secondary">
                      Todos
                    </Typography>
                  }
                />
                <Divider orientation="vertical" flexItem />
                <Tab
                  disableTouchRipple
                  value="completed-todos"
                  label={
                    <Typography variant="body1" color="secondary">
                      Completed Todos
                    </Typography>
                  }
                />
                <Divider orientation="vertical" flexItem />
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
        <Grid item className={classes.todos}>
          {/* --- Todos list --- */}
          <List style={{ marginLeft: "0.4rem" }}>
            {todos.map((value, index) => {
              const labelId = `checkbox-list-label-${index}`;
              return (
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
                    {({ TransitionProps, placement }) => (
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
                                onClick={() => editTodoHandler(value.id)}
                                className={classes.menuItem}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => deleteTodoHandler(value.id)}
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
                    divider
                    className={classes.listItem}
                    onMouseLeave={handleClosePopper}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={handleToggle(value.id)}
                        color="secondary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{value.name}</Typography>
                      }
                      secondary={
                        <Typography variant="body1">
                          {value.description}
                        </Typography>
                      }
                      className={classes.listText}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        disableRipple
                        onMouseOver={handlePopper(index)}
                        onClick={clickOpenPopper(index)}
                      >
                        <MoreHorizIcon
                          className={classes.icon}
                          style={{ fill: "#fff" }}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </Grid>
      </Grid>
      {open ? <Modal /> : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedTodoGroup: state.todo.selectedTodoGroup,
  open: state.modal.open,
});

const mapDispatchToProps = (dispatch) => ({
  onModalOpen: (type) => dispatch(actions.setModal(type)),
  onOptionIndexTodo: (id) => dispatch(actions.optionIndexTodo(id)),
  toggleComplete: (id, groupName) =>
    dispatch(actions.toggleComplete(id, groupName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoGroupContainer);

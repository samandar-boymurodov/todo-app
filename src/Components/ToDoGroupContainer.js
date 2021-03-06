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
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Fade,
  Tabs,
  Tab,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Badge,
  Tooltip,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, useTheme } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
    top: 108,
    width: "100%",
    right: "0.4rem",
    boxSizing: "border-box",
    paddingLeft: "0.4rem",
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
    fontWeight: 400,
    fontFamily: "Raleway",
    backgroundColor: teal[400],
  },
  listItem: {
    backgroundColor: teal[300],
    paddingTop: 0,
    paddingBottom: 0,
  },
  accordion: {
    backgroundColor: "transparent",
    width: "100%",
    "&:before": {
      backgroundColor: "transparent",
    },
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  accordionSummary: {
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  accordionDetails: {
    padding: "0px 8px 0px 16px",
  },
  description: {
    wordBreak: "break-word",
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
  listText: {
    wordWrap: "break-word",
    marginRight: "1.5rem",
    wordBreak: "break-word",
  },
  closeIcon: {
    cursor: "pointer",
  },
  badge: {
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: 400,
  },
  cautionText: {
    position: "absolute",
    top: 18,
    right: 0,
    left: 0,
  },
}));

function TodoGroupContainer({
  selectedTodoGroup,
  onModalOpen,
  open,
  onOptionIndexTodo,
  toggleComplete,
}) {
  const classes = useStyles(selectedTodoGroup);
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [openSearch, setOpenSearch] = useState(false);
  const [checked, setChecked] = useState([]);
  const [tab, setTab] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // For controlling search
  useEffect(() => {
    setSearchResult(
      selectedTodoGroup.todos.filter(
        (e) =>
          e.name.includes(searchQuery) ||
          (e.description ? e.description.includes(searchQuery) : false)
      )
    );
  }, [searchQuery, selectedTodoGroup]);

  // To handle completion of tasks
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
    onModalOpen(modalTypes.EDIT_TODO);
    onOptionIndexTodo(id);
  };

  const deleteTodoHandler = (id) => {
    onModalOpen(modalTypes.DELETE_TODO);
    onOptionIndexTodo(id);
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
  const handleAccordion = (id, e, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };

  const todos =
    tab === "todos"
      ? searchResult.filter((e) => !e.completed)
      : searchResult.filter((e) => e.completed);

  // To display as a content of a badge
  const completedItemsCount = searchResult.filter((e) => e.completed).length;

  return (
    <>
      <Grid container direction="column" className={classes.groupContainer}>
        <Paper square className={classes.infoContainer}>
          {/*--- ToolBar ---*/}
          <Grid container direction="column">
            <Grid item style={{ height: 50, marginBottom: "0.5rem" }}>
              {openSearch && matchesXS ? (
                <Fade in={openSearch}>
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
                </Fade>
              ) : null}

              <Grid container alignItems="center" style={{ height: "100%" }}>
                {!(openSearch && matchesXS) ? (
                  <Grid item className={classes.groupTitleContainer}>
                    {selectedTodoGroup.name ? (
                      <Typography variant="h3" className={classes.groupTitle}>
                        {selectedTodoGroup.name}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h6"
                        color="primary"
                        align="center"
                        className={classes.cautionText}
                      >
                        Select a Todo Group
                      </Typography>
                    )}
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
                          <Tooltip title="search todos" interactive arrow>
                            <SearchIcon color="secondary" />
                          </Tooltip>
                        </IconButton>
                      ) : !(openSearch && matchesXS) ? (
                        <Fade in={openSearch}>
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
                        </Fade>
                      ) : null}
                    </Grid>

                    {!(matchesSM && openSearch) ? (
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          style={{ color: "#fff" }}
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
              <Badge
                badgeContent={completedItemsCount}
                color="primary"
                overlap="rectangle"
                classes={{ colorPrimary: classes.badge }}
              >
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
              </Badge>
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
                  <ListItem divider className={classes.listItem}>
                    <ListItemIcon style={{ marginRight: "-32px" }}>
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
                    <Accordion
                      square
                      elevation={0}
                      classes={{
                        root: classes.accordion,
                      }}
                      onChange={(e, isExpanded) =>
                        handleAccordion(value.id, e, isExpanded)
                      }
                      expanded={expanded === value.id}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        classes={{
                          content: classes.accordionSummary,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: 600,
                                color: teal[800],
                              }}
                            >
                              {value.name}
                            </Typography>
                          }
                          className={classes.listText}
                        />
                      </AccordionSummary>
                      <AccordionDetails
                        classes={{ root: classes.accordionDetails }}
                      >
                        <Typography
                          variant="body1"
                          className={classes.description}
                        >
                          {value.description}
                        </Typography>
                      </AccordionDetails>
                      <AccordionActions>
                        <Button
                          onClick={() => editTodoHandler(value.id)}
                          className={classes.menuItem}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteTodoHandler(value.id)}
                          className={classes.menuItem}
                        >
                          Delete
                        </Button>
                      </AccordionActions>
                    </Accordion>
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

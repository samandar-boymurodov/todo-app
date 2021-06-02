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
  Hidden,
  Dialog,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import IsScrolling from "react-is-scrolling";

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
  todoGroup: {
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
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
  closeIcon: {
    fill: "#fff",
    fontSize: "2.5rem",
  },
}));

const arrays = [...new Array(30).fill("MnemonicsMnemonicsMnemonicsMnemonics")];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function TodoGroupsContainer({ isScrolling }) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopper, setOpenPopper] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

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
                {arrays.map((item, index) => (
                  <ListItem
                    onMouseLeave={handleClosePopper}
                    key={index}
                    button
                    className={classes.todoGroups}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <Typography variant="h5" className={classes.todoGroup}>
                          <span style={{ wordWrap: "break-word" }}>{item}</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={2} container justify="flex-end">
                        <IconButton
                          disableRipple
                          onMouseOver={handlePopper(index)}
                          onClick={clickOpenPopper(index)}
                        >
                          <MoreHorizIcon className={classes.icon} />
                        </IconButton>
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
                {arrays.map((item, index) => (
                  <ListItem
                    onMouseLeave={handleClosePopper}
                    key={index}
                    button
                    className={classes.todoGroups}
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
                          <MoreHorizIcon className={classes.icon} />
                        </IconButton>
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
        </Dialog>
        <Grid item>
          <ToDoGroupContainer />
        </Grid>
      </Grid>
      <Modal type={modalType} />
    </div>
  );
}

export default IsScrolling(TodoGroupsContainer);

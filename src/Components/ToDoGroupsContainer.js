import Header from "../UI/Header";
import Modal from "../UI/Modal";
import ToDoGroupContainer from "./ToDoGroupContainer";
import React, { useEffect } from "react";
import { connect } from "react-redux";
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

const arrays = [...new Array(30).fill("Mnemonics")];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function TodoGroupsContainer({ isAuth }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    }
  }, [isAuth]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopper, setOpenPopper] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handlePopper = (index) => (e) => {
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
  };
  const clickOpenPopper = (index) => (e) => {
    setOpenPopper((prev) => (prev === index ? null : index));
    setAnchorEl(e.currentTarget);
  };
  const editGroupHandler = (e) => {
    setOpenPopper(null);
    setAnchorEl(null);
    setModalType("EditGroup");
  };
  const deleGroupteHandler = (e) => {
    setOpenPopper(null);
    setAnchorEl(null);
    setModalType("DeleteGroup");
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
                {arrays.map((item, index) => (
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
                    <ListItem
                      onMouseLeave={handleClosePopper}
                      button
                      className={classes.groupContainer}
                      divider
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h5"
                            className={classes.groupText}
                          >
                            {item}
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
                    <ListItem
                      onMouseLeave={handleClosePopper}
                      button
                      className={classes.groupContainer}
                      divider
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h5"
                            className={classes.groupText}
                          >
                            {item}
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

const mapStateToProps = (state) => ({
  isAuth: !!state.auth.token,
});

export default connect(mapStateToProps)(TodoGroupsContainer);

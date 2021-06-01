import Header from "../UI/Header";
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
    width: "25rem",
    top: 56,
    bottom: 55,
  },
  todoGroup: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#fff",
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
    width: "25rem",
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

  const handlePopper = (index) => (e) => {
    if (isScrolling) {
      return;
    }
    setOpenPopper(index);
    setAnchorEl(e.currentTarget);
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
                <ListItem key={index} button className={classes.todoGroups}>
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
                        onClick={handlePopper(index)}
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
                                  <MenuItem onClick={handleClosePopper}>
                                    Edit
                                  </MenuItem>
                                  <MenuItem onClick={handleClosePopper}>
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
                prop
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

        <Grid item></Grid>
      </Grid>
    </div>
  );
}

export default IsScrolling(TodoGroupsContainer);

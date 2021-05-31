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
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IsScrolling from "react-is-scrolling";
import { isInaccessible } from "@testing-library/dom";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  todoGroupsContainer: {
    position: "absolute",
    overflow: "auto",
    width: "25rem",
    top: 56,
    bottom: 0,
  },
  todoGroup: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
        <Grid item className={classes.todoGroupsContainer}>
          <List>
            {arrays.map((item, index) => (
              <ListItem key={index}>
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
                      <MoreHorizIcon color="primary" />
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
                            <ClickAwayListener onClickAway={handleClosePopper}>
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
        <Grid item></Grid>
      </Grid>
    </div>
  );
}

export default IsScrolling(TodoGroupsContainer);

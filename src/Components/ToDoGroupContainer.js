import { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  groupContainer: {
    position: "absolute",
    width: "65%",
    right: 0,
    bottom: 0,
    top: 63,
    backgroundColor: theme.palette.background.paper,
  },
  infoContainer: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    margin: "0.3rem 0.5rem",
    boxShadow: theme.shadows[3],
    backgroundColor: cyan[100],
    display: "flex",
    alignItems: "center",
    height: 55,
  },
  groupTitle: {
    color: theme.palette.secondary.main,
  },
  todos: {
    position: "absolute",
    bottom: 0,
    top: 70,
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
  listItem: {
    backgroundColor: teal[300],
  },
}));

const arrays = [...new Array(100)].map((el) => [
  "Home",
  "Garden, Kitchen, Bedroom",
]);

export default function TodoGroupContainer() {
  const [openSearch, setOpenSearch] = useState(false);
  const [checked, setChecked] = useState([0]);
  const classes = useStyles();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container direction="column" className={classes.groupContainer}>
      <Paper square className={classes.infoContainer}>
        <Grid item container>
          <Grid item xs={6} container justify="flex-end">
            <Grid item>
              <Typography variant="h3" className={classes.groupTitle}>
                Locations
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={6} justify="flex-end" alignItems="center">
            <Grid item>
              {!openSearch ? (
                <Fade in={!openSearch}>
                  <IconButton onClick={() => setOpenSearch(true)}>
                    <SearchIcon color="secondary" />
                  </IconButton>
                </Fade>
              ) : (
                <Fade in={openSearch}>
                  <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
                    <TextField
                      autoFocus
                      inputProps={{
                        style: {
                          padding: "8px 5px",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Type to search"
                    />
                  </ClickAwayListener>
                </Fade>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ color: "#fff", boxShadow: "none" }}
              >
                Add todo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid item className={classes.todos}>
        <List style={{ marginLeft: "0.4rem" }}>
          {arrays.map((value, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem divider className={classes.listItem} key={index}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={handleToggle(value)}
                    color="secondary"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="h6">{value[0]}</Typography>}
                  secondary={
                    <Typography variant="body1">{value[1]}</Typography>
                  }
                />
              </ListItem>
            );
          })}
          +
        </List>
      </Grid>
    </Grid>
  );
}

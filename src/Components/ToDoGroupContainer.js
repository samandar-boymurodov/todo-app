import { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";

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
    margin: "6px 5px",
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.default,
    display: "flex",
    alignItems: "center",
    height: 55,
  },
  groupTitle: {
    color: theme.palette.secondary.main,
  },
}));

export default function TodoGroupContainer() {
  const [openSearch, setOpenSearch] = useState(false);
  const classes = useStyles();

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
                        endAdornment: <SearchIcon color="primary" />,
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
    </Grid>
  );
}

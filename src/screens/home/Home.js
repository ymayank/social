import React from 'react';
import { observer, inject } from 'mobx-react';
import { makeStyles, AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Box, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MediaCard from './MediaCard';
import LeftDrawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 30,
    marginTop: 94,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Home(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawer, setIsDrawer] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async() => {
    setAnchorEl(null);
    await localStorage.clear();
    props.history.push('/');
  }

  return (
    <Box component="div">
      <LeftDrawer isDrawer={isDrawer} setIsDrawer={setIsDrawer} {...props} />
      <AppBar position="fixed">
      <Toolbar>
          <IconButton onClick={() => setIsDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          Social
          </Typography>
          <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          >
          <AccountCircle />
          </IconButton>
          <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          >
          <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
      </Toolbar>
      </AppBar>
      <div className={classes.cardContainer}>
        <Grid container spacing={2}>
          {props.home.homeListing.map(item => <MediaCard key={item.id} item={item} />)}
        </Grid>
      </div>
    </Box>
  );
}

export default inject('home', 'profile')(observer(Home));
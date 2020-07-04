import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountCircle, PhotoLibrary, VideoLibrary } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  username: {
    textTransform: 'capitalize'
  }
});

export default function LeftDrawer(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState('Images');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setIsDrawer(open)
  };

  useEffect(() => {
    props.home.getHomeListing('Images');
  }, []);

  const getData = (text) => {
    if(text === 'selected') return;
    setSelected(text);
    props.home.getHomeListing(text);
  }

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: false,
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ListItem button key={'username'}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText className={classes.username} primary={props.profile.username} />
      </ListItem>
      <Divider />
      <List>
        {['Images', 'Video'].map((text, index) => (
          <ListItem onClick={() => getData(text)} selected={selected === text} button key={text}>
            <ListItemIcon>{ index === 0 ? <PhotoLibrary /> : <VideoLibrary />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer anchor={'left'} open={props.isDrawer} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
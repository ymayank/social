import React from 'react';
import { inject, observer } from 'mobx-react';
import {Backdrop, CircularProgress, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Loader(props) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.home.isLoading}>
    <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default inject('home')(observer(Loader));
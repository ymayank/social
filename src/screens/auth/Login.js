import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Avatar, Button, CssBaseline, Grid, Box, Container, makeStyles, Typography, Link } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Copyright from '../../components/Copyright';
import TextInput from '../../components/TextInput';
import Regex from '../../utils/regex';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [errors, changeErrors] = useState({});

  const navigateTo = (e, to) => {
    e.preventDefault();
    props.history.push(to)
  }

  const validateForm = () => {
    const newErrors = {};
    if(!username) {
      newErrors.email = 'Please Enter Your Username';
    } else if(!Regex.alphaOnly.test(username)) {
      newErrors.email = 'Please Enter a Valid Username';
    }
    if(!password) {
      newErrors.password = 'Please Enter Your Password';
    } else if(password.length < 6) {
      newErrors.password = 'Please Enter a Valid Password';
    }
    changeErrors(newErrors);
    return !Object.keys(newErrors).length
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      const data = {
        username: username,
        password: password
      };
      const res = await props.auth.login(data);
      if(res) {
        props.history.push('/home')
      } else {
        props.home.showToast({message: res.message});
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextInput
            error={errors.email ? true : false}
            helperText={errors.email}
            required
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => changeUsername(e.target.value)}
          />
          <TextInput
            error={errors.password ? true : false}
            helperText={errors.password}
            required
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' onClick={(e) => navigateTo(e, '/forgot-password')} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' onClick={(e) => navigateTo(e, '/sign-up')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default inject('home','auth')(observer(Login));
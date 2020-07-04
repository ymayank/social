import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Avatar, Button, CssBaseline, Box, Container, makeStyles, Typography } from '@material-ui/core';
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

function ForgotPassword(props) {
  const classes = useStyles();
  const [email, changeEmail] = useState('');
  const [errors, changeErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if(!email) {
      newErrors.email = 'Please Enter Your Email';
    } else if(!Regex.email.test(email)) {
      newErrors.email = 'Please Enter a Valid Email';
    }
    changeErrors(newErrors);
    return !Object.keys(newErrors).length
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      const data = {
        email: email,
      };
      const res = await props.auth.forgotPassword(data);
      if(res) {
        props.home.showToast({message: 'Please check your mail id to reset password'});
        props.history.push('/')
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
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextInput
            error={errors.email ? true : false}
            helperText={errors.email}
            required
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Email
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default inject('home','auth')(observer(ForgotPassword));

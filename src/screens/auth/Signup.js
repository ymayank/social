import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import {Avatar, Button, CssBaseline, Grid, Box, Typography, makeStyles, Container, Link} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import {DropzoneDialog} from 'material-ui-dropzone'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  profilePic: {
    height: 150,
    width: 150,
  }
}));

function Signup(props) {
  const classes = useStyles();
  const [firstName, changeFirstName] = useState('');
  const [lastName, changeLastName] = useState('');
  const [username, changeUsername] = useState('');
  const [role, changeRole] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [confirmPassword, changeConfirmPassword] = useState('');
  const [gender, changeGender] = useState('');
  const [fbId, changeFbId] = useState('');
  const [bio, changeBio] = useState('');

  const [errors, changeErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('/broken-image.jpg');

  const navigateTo = (e, to) => {
    e.preventDefault();
    props.history.push(to)
  }

  const validateForm = () => {
    const newErrors = {};
    if(!firstName) {
      newErrors.firstName = 'Please Enter First Name';
    }
    if(!lastName) {
      newErrors.lastName = 'Please Enter Last Name';
    }
    if(!username) {
      newErrors.username = 'Please Enter a Username';
    }
    if(!role) {
      newErrors.role = 'Please Enter a Role';
    }
    if(!email) {
      newErrors.email = 'Please Enter Email';
    } else if(!Regex.email.test(email)) {
      newErrors.email = 'Please Enter a Valid Email';
    }
    if(!password) {
      newErrors.password = 'Please Enter Password';
    } else if(password.length < 6) {
      newErrors.password = 'Please Enter Valid Password';
    }
    if(!confirmPassword) {
      newErrors.confirmPassword = 'Please Confirm Password';
    } else if(password !== confirmPassword) {
      newErrors.confirmPassword = 'Password and Confirm Password does not match';
    }
    if(!gender) {
      newErrors.gender = 'Please Enter Gender';
    }
    if(!fbId) {
      newErrors.fbId = 'Please Enter Facebook Id';
    }
    if(!bio) {
      newErrors.bio = 'Please Enter Bio';
    }
    changeErrors(newErrors);
    return !Object.keys(newErrors).length
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    if(validateForm()) {
      const data = new FormData();
      data.append('username', username);
      data.append('role', role);
      data.append('firstname', firstName);
      data.append('lastname', lastName);
      data.append('gender', gender);
      data.append('fbId', fbId);
      data.append('bio', bio);
      data.append('profilePic', profilePic);
      data.append('block', 'a');
      data.append('version', '1.1');
      data.append('device', 'Redmi');
      data.append('signupType', 'Facebook');
      data.append('email', email);
      data.append('password', password);

      const res = await props.auth.signup(data);
      if(res) {
        props.home.showToast({message: 'Registration Success'});
        props.history.push('/')
      } else {
        props.home.showToast({message: res.message});
      }
    }
  }

  const updateImage = (e) => {
    e.preventDefault();
    setOpen(true)
  }

  function createObjectURL ( file ) {
    if ( window.webkitURL ) {
        return window.webkitURL.createObjectURL( file );
    } else if ( window.URL && window.URL.createObjectURL ) {
        return window.URL.createObjectURL( file );
    } else {
        return '';
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid container xs={12} justify="center" >
              <Link href='#' onClick={updateImage}>
                <Avatar src={profilePic} className={classes.profilePic}/>
              </Link>
              <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                maxFileSize={5000000}
                filesLimit={1}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => {
                  console.log('Files:', files);
                  setProfilePic(createObjectURL(files[0]))
                  setOpen(false);
                }}
                showPreviewsInDropzone
                showPreviews={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                name="firstName"
                required
                label="First Name"
                autoFocus
                error={errors.firstName ? true : false}
                helperText={errors.firstName}
                value={firstName}
                onChange={(e) => changeFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                required
                label="Last Name"
                name="lastName"
                error={errors.lastName ? true : false}
                helperText={errors.lastName}
                value={lastName}
                onChange={(e) => changeLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              <TextInput
                required
                label="Username"
                name="username"
                error={errors.username ? true : false}
                helperText={errors.username}
                value={username}
                onChange={(e) => changeUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                required
                label="Role"
                name="role"
                error={errors.role ? true : false}
                helperText={errors.role}
                value={role}
                onChange={(e) => changeRole(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                required
                label="Email Address"
                name="email"
                error={errors.email ? true : false}
                helperText={errors.email}
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                required
                name="password"
                label="Password"
                type="password"
                error={errors.password ? true : false}
                helperText={errors.password}
                value={password}
                onChange={(e) => changePassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                required
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword}
                value={confirmPassword}
                onChange={(e) => changeConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              <TextInput
                required
                label="Gender"
                name="gender"
                error={errors.gender ? true : false}
                helperText={errors.gender}
                value={gender}
                onChange={(e) => changeGender(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              <TextInput
                required
                label="Facebook Id"
                name="fbId"
                error={errors.fbId ? true : false}
                helperText={errors.fbId}
                value={fbId}
                onChange={(e) => changeFbId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                required
                label="Bio"
                name="bio"
                error={errors.bio ? true : false}
                helperText={errors.bio}
                value={bio}
                onChange={(e) => changeBio(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href='#' onClick={(e) => navigateTo(e, '/')} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} mb={10}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default inject('home','auth')(observer(Signup));
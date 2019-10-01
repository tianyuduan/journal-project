import withRoot from '../withRoot';
// --- Post bootstrap -----
import React, { Component, useState } from 'react';
import Typography from '../components/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {

  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault()
    if ( password !== password2 ){
      console.log('passwords dont match');
    } else {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify({ name, email, password });
        console.log(body);

        try {
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch(err) {
        console.error(err.response.data);
      }
    }
  }

  return (
    <React.Fragment>
    <Typography variant="h3" gutterBottom marked="center" align="center">
      Register
    </Typography>
    <Typography variant="body2" align="center">
      <Link href="/signin" underline="always">
        Already have an account?
      </Link>
    </Typography>
      <form onSubmit={e => onSubmit(e)}>
        <Grid
          container spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <TextField
              id='standard-name'
              variant="outlined"
              label='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              margin='normal'
              />
          </Grid>
          <Grid item xs>
            <TextField
              id="standard-password-input"
              variant="outlined"
              label='Password'
              name='password'
              value={password}
              type='password'
              onChange={e => onChange(e)}
              margin='normal'
              />
          </Grid>
          <Grid item xs>
            <TextField
              id="standard-password-input"
              variant="outlined"
              label='Confirm Password'
              name='password2'
              value={password2}
              type='password'
              onChange={e => onChange(e)}
              margin='normal'
              />
          </Grid>
          <Grid item xs>
            <TextField
              id="standard-email-input"
              variant="outlined"
              label='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              margin='normal'
              />
          </Grid>
          <Grid item xs>
            <Button
              variant="contained" color="primary"
              type='submit'
              >
              Submit
            </Button>
          </Grid>
        </Grid>
        </form>
    </React.Fragment>
  );
}


export default withRoot(Register);

import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import {register} from "assets/jss/material-dashboard-react/layouts/RegistrationStyle.js";

// import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Redirect} from 'react-router-dom';
import { Grid } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Registration extends Component {
  state = {
    firstName:"",
    lastName:"",
    email:"",
    password: "",
    phoneNumber:"",
    // hidePassword: true,
    // error: null,
    // errorOpen: false
  };

  errorClose = e => {
    this.setState({
      errorOpen: false
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    }
    return true;
  };
  submitRegistration = e => {
    e.preventDefault();
    const newUserCredentials = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber:this.state.phoneNumber,
      password: this.state.password,
    };

    console.log("this.props.newUserCredentials", newUserCredentials);

    axios.post('http://localhost:5000/users/account/signup',newUserCredentials)
    .then(res=>{
        console.log(res.data)
        if(res.data.success===false){
          alert(res.data.message)
        }else{
          this.props.history.push('/admin/entrance'); 
        }
      });

    
};

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
                onChange={this.handleChange("firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                autoComplete="lname"
                onChange={this.handleChange("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Почта"
                name="email"
                autoComplete="email"
                onChange={this.handleChange("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Номер Телефона"
                name="phoneNumber"
                autoComplete="phoneNumber"
                onChange={this.handleChange("phoneNumber")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange("password")}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submitRegistration}
          >
            Регистрация
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/admin/entrance" variant="body2">
                Уже есть аккаунт? Войдите
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
    );
  }
}

export default withStyles(register)(Registration);

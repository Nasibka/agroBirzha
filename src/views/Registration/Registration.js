import React, { Component } from "react";
import axios from 'axios';
import { withStyles,useStyles } from "@material-ui/core/styles";
import {register} from "assets/jss/material-dashboard-react/layouts/RegistrationStyle.js";

// import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Grid } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const inputProps={
  startAdornment:
    (<InputAdornment position="start">
      +7
    </InputAdornment>)
}
const normalizeInput = (value, previousValue) => {
  // return nothing if no value
  if (!value) return value; 

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length; 

  if (!previousValue || value.length > previousValue.length) {

    // returns: "x", "xx", "xxx"
    if (cvLength < 4) return currentValue; 

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`; 

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
     return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 8)}-${currentValue.slice(8,10)}`; 
  }
};

class Registration extends Component { 
  state = {
    firstName:"",
    lastName:"",
    email:"",
    password: "",
    phoneNumber:"",
    backgroundColor:'',
    fnameValid:'',
    lnameValid:'',
    emailValid:'',
    phoneValid:'',
    passwordValid:''
  };

  handleChange = name => e => {
    const phoneRegexp = /^[0-9\b]+$/ 
    const emailRegexp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"); 
    switch(name){
      case 'phoneNumber':
        const value = e.target.value
        this.setState(prevState=>({ 
          [name]: normalizeInput(value, prevState.phoneNumber)
        }))
        break
      default:
        this.setState({
          [name]: e.target.value
        });
        break
    }

  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    }
    return true;
  };

  submitRegistration = e => {
    e.preventDefault();
    const emailRegexp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
console.log(this.state.phoneNumber.length)
    if(emailRegexp.test(this.state.email)){

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
          if(res.data.success===false){
            // alert(res.data.message)
            console.log(res.data.message)
  
            switch(res.data.type){
              case 'firstName':
                this.setState({
                  fnameValid: res.data.message,
                  lnameValid:'',
                  emailValid:'',
                  passwordValid:'',
                  phoneValid:''
                });
                break
              case 'lastName':
                this.setState({
                  lnameValid: res.data.message,
                  fnameValid:'',
                  emailValid:'',
                  passwordValid:'',
                  phoneValid:''
                });              
                break
              case 'email':
                this.setState({
                  emailValid: res.data.message,
                  lnameValid:'',
                  fnameValid:'',
                  passwordValid:'',
                  phoneValid:''
                });              
                break
              case 'phoneNumber':
                this.setState({
                  phoneValid: res.data.message,
                  lnameValid:'',
                  emailValid:'',
                  passwordValid:'',
                  fnameValid:''
                });             
              break
              case 'password':
                this.setState({
                  passwordValid: res.data.message,
                  lnameValid:'',
                  emailValid:'',
                  fnameValid:'',
                  phoneValid:''
                });
                break
            }
          }else{
            this.props.history.push('/admin/entrance'); 
          }
        });
    }else{
      this.setState({
        emailValid:'Не правильная почта',
        lnameValid:'',
        fnameValid:'',
        passwordValid:'',
        phoneValid:''
      })
    }

    
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
              <div style={{color:'red'}}>{this.state.fnameValid}</div>
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
              <div style={{color:'red'}}>{this.state.lnameValid}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type='email'
                id="email"
                label="Почта"
                name="email"
                autoComplete="email"
                onChange={this.handleChange("email")}
              />
              <div style={{color:'red'}}>{this.state.emailValid}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Номер Телефона"
                name="phoneNumber"
                value={this.state.phoneNumber}
                InputProps={inputProps}
                onChange={this.handleChange("phoneNumber")}
              />
              <div style={{color:'red'}}>{this.state.phoneValid}</div>
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
              <div style={{color:'red'}}>{this.state.passwordValid}</div>
              {/* <ValidationTextField
                fullWidth
                label="Пароль"
                required
                type='password'
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange("password")}
                id="validation-outlined-input"
              /> */}
              {/* <CssTextField
                fullWidth
                className='kek'
                label="Пароль"
                variant="outlined"
                required
                type='password'
                value={this.state.password}
                onChange={this.handleChange("password")}
                id="custom-css-outlined-input"
              /> */}
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

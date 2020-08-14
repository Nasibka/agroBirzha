import React,{ useEffect,useState,useReducer }from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'

// @material-ui/icons

// core components
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import { SET_USERNAME } from "../../actions/actions.js";
// import userNameReducer from '../../reducers/reducers'

import {
    getFromStorage,
    setInStorage
} from '../../utils/storage'

import styles from "assets/jss/material-dashboard-react/views/EntranceStyle.js";

const useStyles = makeStyles(styles);


export default function Entrance() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken]=useState('')
  const [emailValid, setEmailValid]=useState('')
  const [wrongPassword, setWrongPassword]=useState('')

//   const [userNameState, dispatch] = useReducer(userNameReducer, []);

  const history = useHistory();
  useEffect(() => {
    const obj = getFromStorage('the_main_app')
    
    if(obj && obj.token){
        //verify token
        axios.get('http://localhost:5000/users/account/verify?token='+obj.token)
        .then(res=>{
            if(res.data){
                history.push('/admin/dashboard');
            }
        })
    }
  },[])
  
  function handleSignIn(){
    const User = {
        email:email,
        password:password
    };
    axios.post('http://localhost:5000/users/account/signin',User)
    .then(res=>{
        if(res.data.success===false){
            switch(res.data.type){
                case 'email':
                    setEmailValid(res.data.message)
                    setWrongPassword('')
                    break
                case 'password':
                    setWrongPassword(res.data.message)
                    setEmailValid('')
                    break
            }
            // alert(res.data.message)
        }else{
            axios.get('http://localhost:5000/users/account/verify?token='+res.data.token)
            .then(res=>{
                // dispatch({ type: SET_USERNAME,username: res.data.userName});
                setUserName(res.data.userName)
            })
            setInStorage('the_main_app',{token:res.data.token})
            history.push('/admin/dashboard');
        }        
    })
  }
  return (
    <Grid container>
        <Grid item xs={12} sm={12} md={12}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Вход
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Почта"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div style={{color:'red'}}>{emailValid}</div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div style={{color:'red'}}>{wrongPassword}</div>
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Запомнить меня"
                /> */}
                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSignIn}
                >
                    Войти
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Забыли пароль?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/admin/registration" variant="body2">
                        {"Регистрация"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container>
    </Grid>

    </Grid>
  );
}

import React,{ useEffect,useState }from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
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
  const [token, setToken]=useState('')
//   const [isLoading, setIsLoading]=useState(true)
//   const [signUpError, setSignUpError]=useState('')
//   const [signInError, setSignInError]=useState('')
  const history = useHistory();
  useEffect(() => {
    const obj = getFromStorage('the_main_app')
    
    if(obj && obj.token){
        // console.log(obj.token)

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
            alert(res.data.message)
        }else{
            setInStorage('the_main_app',{token:res.data.token})
            history.push('/');
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

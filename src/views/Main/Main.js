import React,{ useEffect,useState }from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// core components
import { Grid } from '@material-ui/core';


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/mainStyle.js";

import {
    getFromStorage,
    setInStorage
  } from '../../utils/storage'
  
const useStyles = makeStyles(styles);

export default function Main() {
  const classes = useStyles();
  const [token, setToken]=useState('')

  useEffect(() => {
    const obj = getFromStorage('the_main_app')
    if(obj && obj.token){
        setToken(obj.token)
    }

  },[])

  return (
    <Grid container>
    <div className={classes.mainBanner}>
        <div className={classes.overlay}>
            <Grid className={classes.mainText} container item xs={12} sm={12} md={10}>
                <Grid className={classes.title} item xs={12} sm={12} md={12}>
                    Покупайте и продавайте агро-продукты за считанные минуты
                </Grid>
                <Grid className={classes.subTitle} item xs={12} sm={12} md={12}>
                    Безопасные сделки через AGRO
                </Grid>
                <Grid className={classes.buttonItem} item xs={12} sm={12} md={4}>
                    <div><a href="/admin/dashboard" className={classes.button}>Посмотреть на рынок <ArrowForwardIcon></ArrowForwardIcon></a></div>                    
                </Grid>
                
            </Grid>
        </div>
    </div>

    {/* <Grid container item xs={6} sm={6} md={6} spacing={1} style={{maxHeight:'750px'}}>
        <Grid container item xs={12} sm={12} md={12} spacing={0}>
        
        
        </Grid>
    </Grid> */}
    </Grid>
  );
}

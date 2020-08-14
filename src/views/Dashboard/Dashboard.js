import React,{ useEffect,useState,useReducer }from "react";
// @material-ui/core
import { makeStyles, withStyles } from "@material-ui/core/styles";

// @material-ui/icons
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// core components
import { Grid } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { createChart } from 'lightweight-charts';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';


import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BidTabs from "components/BidTabs/BidTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Card from "components/Card/Card.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardBody from "components/Card/CardBody.js";


import { saleList, buyList } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {
  getFromStorage,
} from '../../utils/storage'

const useStyles = makeStyles(styles);

const chartProperties ={
  height:500,
  width:693,
  timeScale:{
      timeVisible:true,
      secondsVisible:false
  }
}
const regexp = /^[0-9\b]+$/ ;

function getRandomInt(max,min) {
  return (Math.random() * (max-min)+min).toFixed(2);
}
export default function Dashboard() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [buyBottom, setBuyBottom] = useState(null);
  const [sellBottom, setSellBottom] = useState(null);

  // const preventDefault = (event) => event.preventDefault();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      stopValueBuy: '',
      limitValueBuy: '',
      amountValueBuy: '',
      stopValueSell: '',
      limitValueSell: '',
      amountValueSell: '',
    }
  );
  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(name +' '+newValue)
    if (newValue === '' || regexp.test(newValue)) {
        setUserInput({[name]: newValue});
    }
  }

  const open = Boolean(anchorEl);
  const LogOrSignIn = (<div style={{display:'flex',alignItems:'center'}}>
  <Typography variant='caption' align='center' style={{width:'300px'}}>
    <Link href="/admin/entrance">
      Войти
    </Link>
    &nbsp;или&nbsp;
    <Link href="/admin/registration" >
      Зарегистрироваться
    </Link>
  </Typography>
  </div>)

  const BuyColorButton = withStyles(() => ({
    root: {
      color: 'white',
      width:'305px',
      textTransform:'none',
      backgroundColor: '#26A69A',
      '&:hover': {
        backgroundColor: '#36B69A',
      },
    },
  }))(Button);
  const SellColorButton = withStyles(() => ({
    root: {
      color: 'white',
      width:'305px',
      textTransform:'none',
      backgroundColor: '#EF5350',
      '&:hover': {
        backgroundColor: '#EF6350',
      },
    },
  }))(Button);

  const BuyButton = (<BuyColorButton>Купить </BuyColorButton>)
  const SellButton = (<SellColorButton>Продать </SellColorButton>)


  useEffect(() => {
    const chart = createChart(document.getElementById('chartContainer'), chartProperties);
    const candleSeries = chart.addCandlestickSeries()

    fetch('http://localhost:5000/products/vegetables/potato/GLL')
    .then(res=>res.json())
    .then(data=>{
      var dates =[]
      data[0].data.map(productInfo=>{
        dates.push([Date.parse(productInfo.selectedDate),parseFloat(productInfo.cost),parseFloat(productInfo.cost)+parseFloat(getRandomInt(0.5,0.1)),parseFloat(productInfo.volume)-parseFloat(getRandomInt(0.5,0.1)),parseFloat(productInfo.volume)])
      })
      const cdata = dates.map(d=>{
        return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
      })
      candleSeries.setData(cdata)
    })
    .catch(err=>console.log(err))

      const obj = getFromStorage('the_main_app')
      
      if(obj && obj.token){
        setBuyBottom(BuyButton)
        setSellBottom(SellButton)
      }else{
        setBuyBottom(LogOrSignIn)
        setSellBottom(LogOrSignIn)
      }

      const timer = setTimeout(() => {
        console.log(loading)
        setLoading(false);
      }, 10000);

      return () => clearTimeout(timer);
  },[])
  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item xs={3} sm={3} md={3}>
          <Grid item xs={12} sm={12} md={12}>
            <CustomTabs
              // title="Tasks:"
              // headerColor="primary"
              tabs={[
                {
                  tabIcon: VerticalSplitIcon,
                  tabIconColor:"black",
                  tabContent: (
                    <div>
                    <Tasks
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={saleList}
                      color={'red'}
                      tableHeight ={350}
                    />
                    <div style={{textAlign:"center",display: 'flex',justifyContent: 'space-around'}} >
                      <p className={classes.cardTitleWhite}>9932</p>
                      <p className={classes.cardCategoryWhite}>₸3 812 362.40</p>
                      <EqualizerIcon style={{ color:'green' }}></EqualizerIcon>
                    </div>
                    <Tasks
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={buyList}
                      color={'green'}
                      tableHeight={350}
                    />
                    </div>
                  )
                },
                {
                  tabIcon: VerticalSplitIcon,
                  tabIconColor:"green",
                  tabContent: (
                    <div>
                      <div style={{textAlign:"center"}}>Покупки</div>
                      <Tasks
                        tasksIndexes={[0, 1]}
                        tasks={buyList}
                        color={'green'}
                        tableHeight={700}
                      />
                    </div>
                  )
                },
                {
                  tabIcon: VerticalSplitIcon,
                  tabIconColor:"red",
                  tabContent: (
                    <div>
                      <div style={{textAlign:"center"}}>Продажи</div>
                      <Tasks
                        tasksIndexes={[0, 1]}
                        tasks={saleList}
                        color={'red'}
                        tableHeight={700}
                      />
                    </div>
                  )
                }
              ]}
            />
          </Grid>
        </Grid>
        <Grid container item xs={6} sm={6} md={6} spacing={1} style={{maxHeight:'750px'}}>
          <Grid item xs={12} sm={12} md={12} id={'chartContainer'}>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} spacing={0}>
            <Grid item xs={6} sm={6} md={6}>
              <Card style={{boxShadow:'1px 1px 0px 0 rgba(0, 0, 0, 0.14)'}}>
                <CardBody>
                  {/* <h5 className={classes.cardTitleWhite}>Купить POT</h5> */}
                  <p className={classes.cardCategoryWhite}>
                  Купить Картофель &nbsp;
                  <InfoIcon style={{fontSize:'1rem',color:'lightgray'}}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  >
                  </InfoIcon> 
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography variant='caption'><Typography variant='subtitle2' color='secondary'>Стоп-Лимит</Typography>Стоп-лимит ордер - это ордер на покупку или продажу монеты, исполняющийся в момент достижения ценой указанного порога.</Typography>
                  </Popover>
                  </p>
                  
                  {/* <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Цена</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={values.amount}
                      onChange={handleChange('amount')}
                      endAdornment={<InputAdornment position="start">KZT</InputAdornment>}
                      labelWidth={50}
                    />
                  </FormControl> */}
                  <CustomInput
                    labelText="Стоп"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelWidth={50}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div style={{fontSize:'0.7rem', color: 'rgba(0, 0, 0, 0.54)',fontWeight:'400'}}>KZT</div>
                        </InputAdornment>
                      )
                    }}
                    name='stopValueBuy'
                    value={userInput.stopValueBuy}
                    onChange={handleChange}
                  />
                  <CustomInput
                    labelText="Лимит"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelWidth={50}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div style={{fontSize:'0.7rem', color: 'rgba(0, 0, 0, 0.54)',fontWeight:'400'}}>KZT</div>
                        </InputAdornment>
                      )
                    }}
                    name ='limitValueBuy'
                    value={userInput.limitValueBuy}
                    onChange={handleChange}
                  />
                  <CustomInput
                    labelText="Количество"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelWidth={110}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div style={{fontSize:'0.7rem', color: 'rgba(0, 0, 0, 0.54)',fontWeight:'400'}}>KG</div>
                        </InputAdornment>
                      )
                    }}
                    name='amountValueBuy'
                    value={userInput.amountValueBuy}
                    onChange={handleChange}
                  />
                  {buyBottom}
                  {/* <div style={{display:'flex',alignItems:'center'}}>
                  <Typography variant='caption' align='center' style={{width:'300px'}}>
                    <Link href="/admin/entrance">
                      Войти
                    </Link>
                    &nbsp;или&nbsp;
                    <Link href="/admin/registration" >
                      Зарегистрироваться
                    </Link>
                  </Typography>
                  </div> */}
                </CardBody>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Card 
              // style={{boxShadow:'1px 1px 0px 0 rgba(0, 0, 0, 0.14)'}}
              >
                <CardBody>
                  <p className={classes.cardCategoryWhite}>
                  Продать Катофель &nbsp;
                  <InfoIcon style={{fontSize:'1rem',color:'lightgray'}}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  >
                  </InfoIcon> 
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography variant='caption'><Typography variant='subtitle2' color='secondary'>Стоп-Лимит</Typography>Стоп-лимит ордер - это ордер на покупку или продажу монеты, исполняющийся в момент достижения ценой указанного порога.</Typography>
                  </Popover>
                  </p>
                  <CustomInput
                    labelText="Стоп"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelWidth={50}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div style={{fontSize:'0.7rem', color: 'rgba(0, 0, 0, 0.54)',fontWeight:'400'}}>KZT</div>
                        </InputAdornment>
                      )
                    }}
                    name ='stopValueSell'
                    value={userInput.stopValueSell}
                    onChange={handleChange}
                  />
                  <CustomInput
                    labelText="Лимит"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelWidth={50}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div style={{fontSize:'0.7rem', color: 'rgba(0, 0, 0, 0.54)',fontWeight:'400'}}>KZT</div>
                        </InputAdornment>
                      )
                    }}
                    name ='limitValueSell'
                    value={userInput.limitValueSell}
                    onChange={handleChange}
                  />
                  <CustomInput
                    labelText="Количество"
                    id="material"
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelWidth={110}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div style={{fontSize:'0.7rem', color: 'rgba(0, 0, 0, 0.54)',fontWeight:'400'}}>KG</div>
                        </InputAdornment>
                      )
                    }}
                    name ='amountValueSell'
                    value={userInput.amountValueSell}
                    onChange={handleChange}
                  />
                  {sellBottom}
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={3} sm={3} md={3} spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <div style={{textAlign:"center",backgroundColor:'white',padding:'8px'}}>ТОРГИ</div>
            {/* {torgi} */}
            <BidTabs/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
          {/* <div style={{textAlign:"center",backgroundColor:'white'}}>Сделки</div> */}
          <CustomTabs
              tabs={[
                {
                  tabName: "Сделки на рынке",
                  tabContent: (
                    <Tasks
                      tasks={saleList}
                      color={'red'}
                      tableHeight ={350}
                    />
                  )
                },
                {
                  tabName: "Мои сделки",
                  tabContent: (
                    <div>
                      {/* <div style={{textAlign:"center"}}>Покупки</div> */}
                      <Tasks
                        tasks={buyList}
                        color={'green'}
                        tableHeight={350}
                      />
                    </div>
                  )
                }
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

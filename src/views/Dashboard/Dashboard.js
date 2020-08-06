import React,{ useEffect,useState }from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// core components
import { Grid } from '@material-ui/core';
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import { createChart } from 'lightweight-charts';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BidTabs from "components/BidTabs/BidTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Card from "components/Card/Card.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { saleList, buyList } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const chartProperties ={
  height:500,
  width:693,
  timeScale:{
      timeVisible:true,
      secondsVisible:false
  }
}

export default function Dashboard() {
  const classes = useStyles();

  // const [values, setValues] = React.useState({
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false,
  // });

  useEffect(() => {
    const chart = createChart(document.getElementById('chartContainer'), chartProperties);
    const candleSeries = chart.addCandlestickSeries()

    fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000')
    .then(res=>res.json())
    .then(data=>{
      const cdata = data.map(d=>{
        // console.log(d[0]/1000+" open:"+d[1]+" high"+d[2]+" low:"+d[3]+" close:"+d[4])
        return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
      })
      candleSeries.setData(cdata)
    })
    .catch(err=>console.log(err))
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
                  Купить POT
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
                          KZT
                        </InputAdornment>
                      )
                    }}
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
                          KZT
                        </InputAdornment>
                      )
                    }}
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
                          KG
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Card 
              // style={{boxShadow:'1px 1px 0px 0 rgba(0, 0, 0, 0.14)'}}
              >
                <CardBody>
                  <p className={classes.cardCategoryWhite}>
                  Продать POT
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
                          KZT
                        </InputAdornment>
                      )
                    }}
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
                          KZT
                        </InputAdornment>
                      )
                    }}
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
                          KG
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={3} sm={3} md={3} spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <div style={{textAlign:"center",backgroundColor:'white'}}>ТОРГИ</div>
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

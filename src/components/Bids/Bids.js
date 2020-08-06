import React,{useEffect,useState} from "react";
import axios from 'axios'
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import TableContainer from '@material-ui/core/TableContainer';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { createChart } from 'lightweight-charts';

// // core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Bids(props) {
  const classes = useStyles();
  const { tasks, dataForGraph, tableHeight } = props;
//   var data = {}

  const chartProperties ={
    height:500,
    width:693,
    timeScale:{
        timeVisible:true,
        secondsVisible:false
    }
  }
  const columns = [
    { id: 'code', label: 'Код', minWidth: 20 ,color:'black',
    format: (value) => value.bold()
    },
    { id: 'cost', label: 'Цена (KZT)', minWidth: 60,color: "black",
    format: (value) => (value).toLocaleString(undefined,
      {'minimumFractionDigits':2,'maximumFractionDigits':2}),
    },
    {
      id: 'volume',
      label: 'Объем',
      minWidth: 50,
      align: 'right',
      color:"black",
      format: (value) => {
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
      }
    },
    {
        id: 'change',
        label: 'Изменение',
        minWidth: 0,
        align: 'right',
        color:"black",
        format: (value) => {
        if(value.charAt(0)=="+"){
            return value.fontcolor("green")
        }else{
            return value.fontcolor("red")
        }
        }
      },
      {
        id: 'name',
        label: 'Название',
        minWidth: 90,
        align: 'right',
        color:"black",
        format: (value) => {
          return value
        }
        
      },
  ]

//   useEffect(() => {
//     var products=[]
//     console.log(dataForGraph)

//    },[])
    
  const handleClick = (event, name) => {
    document.getElementById('chartContainer').innerHTML=""
    const chart = createChart(document.getElementById('chartContainer'), chartProperties);
    var candleSeries = ''
    var cdata = {}

    candleSeries = chart.addCandlestickSeries()
    cdata = dataForGraph[name].map(d=>{
        return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
    })
    candleSeries.setData(cdata)
  }

  return (
    <Paper className={classes.root} style={{boxShadow:'none'}}>
      <TableContainer className={classes.container} style = {{maxHeight:tableHeight}}>
        <Table className={classes.table} size='small' stickyHeader>
          <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align='right'
                      style={{ width: column.minWidth,fontSize:10,lineHeight: 1.5 ,padding:'6px 2px 6px 8px'}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
          <TableBody>
            {tasks.map((row,index) => {
              return (
                  <TableRow hover className={classes.tableRow} key={index}
                  onClick={(event) => handleClick(event, row.code)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='right' style={{fontSize:'0.6rem',color:column.color,padding:'6px 3px 6px 3px'}}>
                          <div className="Container" dangerouslySetInnerHTML={{__html: column.format(value)}}></div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
              );
            })}   
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}


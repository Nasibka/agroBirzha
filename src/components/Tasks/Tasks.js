import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Tasks(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const { tasksIndexes, tasks, color, tableHeight } = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns = [
    { id: 'cost', label: 'Цена (KZT)', minWidth: 50 ,color:color,
    format: (value) => {
      value=value.toFixed(2)
      var parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }},
    { id: 'amount', label: 'Кол-во(кг)', minWidth: 50,color: "black",
    format: (value) => {
      value=value.toFixed(2)
      var parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }
    },
    {
      id: 'total',
      label: 'Сумма(KZT)',
      minWidth: 50,
      align: 'right',
      color:"black",
      format: (value) => {
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
      }
      
    },
  ]

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
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
                      style={{ maxWidth: column.minWidth,fontSize:10,lineHeight: 1.5 }}
                    >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                    </TableCell>
                  
                  ))}
              </TableRow>
            </TableHead>
          <TableBody>
          {stableSort(tasks, getComparator(order, orderBy))
                .map((row, index) => {
                  

            // {tasks.map((row,index) => {
              return (
                // <Tooltip
                //   id="tooltip-right"
                //   title="Some Info"
                //   placement="right"
                //   classes={{ tooltip: classes.tooltip }}
                // >
                  <TableRow className={classes.tableRow} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align='right' style={{fontSize:'0.6rem',color:column.color}}>
                          {column.format && typeof(value) === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                // </Tooltip>
              );
            })}   
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  // tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};

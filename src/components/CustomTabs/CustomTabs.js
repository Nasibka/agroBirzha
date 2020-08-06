import React ,{useState, useEffect}from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";

// const useStyles = makeStyles({
//   option: {
//     fontSize: 15,
//     '& > span': {
//       marginRight: 10,
//       fontSize: 18,
//     },
//   },
// });
const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const classes = useStyles();

  const [tab,setTab] = useState(null);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  
  const handleChange = (event, value) => {
    setValue(value);
  };
  const { headerColor, plainTabs, tabs, title } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
  });
  useEffect(()=>{
    if(typeof value === 'number'){
      // console.log(value+" "+tabs[value])
      setTab(<div key={value}>{tabs[value].tabContent}</div>);
    }
    if (typeof value === 'string'){
     setTab(<div>kek</div>)
   }
  },[value])
  const handleMenuOpen = (list,event) => {
    const { currentTarget } = event;
    setList(list)
    setOpen(true);
    setAnchorEl(currentTarget);
    
  };
  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const handleChoose = (event) => {
    setValue(event)
    setOpen(false);
    setAnchorEl(null);
  };
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}
      onMouseLeave={handleMenuClose.bind(this)}
      >
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={typeof value==='number'?value:0}
          onChange={handleChange}
          // indicatorColor="primary"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon style={{ color: prop.tabIconColor,width:'1rem',height:'1rem' }}/>
              };
            }
            return (
              <Tab
                onMouseEnter={handleMenuOpen.bind(this,prop.categoryList)}
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
        <Popper open={open} anchorEl={anchorEl} id="menu-list-grow" style={{zIndex:100}}>
          <Paper>
            <MenuList>
              {list && list.map((item, index) => (
                <MenuItem key={index} style={{fontSize:'0.6rem',padding:'0.2rem'}}
                onClick={()=>{handleChoose(item)}}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Popper>
      </CardHeader>
      <CardBody style={{padding:0}}>
        {tab}
        {/*tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })*/}
        
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string,
      tabIcon: PropTypes.object,
      tabIconColor: PropTypes.string,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};

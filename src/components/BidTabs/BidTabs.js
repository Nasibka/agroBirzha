import React ,{useState, useEffect}from "react";
import axios from 'axios'
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
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Bids from "components/Bids/Bids.js";

import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";

const useStyles = makeStyles(styles);

function getRandomInt(max,min) {
    return (Math.random() * (max-min)+min).toFixed(2);
  }

export default function BidTabs(props) {
  const classes = useStyles();

  const [mainTabs,setMainTabs] = useState([]);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState(true);
  var categoriesTabs=[]

  const { headerColor, plainTabs } = props;
  useEffect(()=>{
    axios.get('http://localhost:5000/categories')
    .then(async res=>{
        //get names and pathes of Main Categories
        res.data.map((p,index)=>{
          categoriesTabs[index]={name:p.name,path:p.category}
        })   
        var i = 0
        var dataForGraph = {}
        let allProducts = await Promise.all(categoriesTabs.map(async (c)=>{
            let result3 = await axios.get('http://localhost:5000/products/'+c.path);
            let data = [];
            result3.data.map(r=>{
                var dates=[]
                    r.data.map(productInfo=>{
                        dates.push([Date.parse(productInfo.selectedDate),parseFloat(productInfo.cost),parseFloat(productInfo.cost)+parseFloat(getRandomInt(0.5,0.1)),parseFloat(productInfo.volume)-parseFloat(getRandomInt(0.5,0.1)),parseFloat(productInfo.volume)])
                    })
                    dataForGraph[r.code]=dates

                    data.push({
                        code: r.code,
                        cost: r.data[r.data.length-1].cost,
                        volume:r.data[r.data.length-1].volume,
                        change:'+32.1',
                        name:r.name,
                        pathTo:r.category.split('/').slice(0,3).join('/')  
                    })
                })
                return data;
            }) 
        );
            // console.log(allProducts)
            var allTabs = []
            for(let index in categoriesTabs){
                let c = categoriesTabs[index];
                let result3 = await axios.get('http://localhost:5000/categories/'+c.path);
                // console.log(result3.data);
                let list = []            
                    result3.data.map(category=>{
                        list.push({name:category.name,category:category.category,mainCategory:i})
                        i++
                    })
                    i++
                    const a = list.map(typeOfProduct=>{
                        let data = allProducts[index].filter((element)=>{
                            if(element.pathTo.match(typeOfProduct.category)){
                                return element
                            }
                        })
                        return({
                            tabName: typeOfProduct.name,
                            categoryList:list,
                            display:'none',
                            tabContent:  (
                            <div>
                                <Bids
                                tasks={data}
                                tableHeight={350}
                                dataForGraph={dataForGraph}
                                />
                            </div>
                            )
                        })
                    })
                    const cat = ({
                        tabName: c.name,
                        categoryList:list,
                        display:'block',
                        tabContent:  (
                        <div>
                            <Bids
                            tasks={allProducts[index]}
                            tableHeight={350}
                            dataForGraph={dataForGraph}
                            />
                        </div>
                        )
                        })
                    a.push(cat)
                    allTabs.push(a)
            }
            var merged = [].concat.apply([],allTabs)
            setMainTabs(merged)
            setLoading(false)
            // console.log(merged) 
    })
  },[])

  const handleChange = (event, value) => {
    setValue(value);
  };
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
  const handleChoose = (event,path) => {
    setValue(event)
    setOpen(false);
    setAnchorEl(null);
  };
  const torgi = loading ? 
  (
    <CircularProgress color='secondary'/>
  ):(<Card plain={plainTabs} style={{height:'413px'}}>
  <CardHeader color={headerColor} plain={plainTabs}
  onMouseLeave={handleMenuClose.bind(this)}
  >
    <Tabs
      value={typeof value==='number'?value:0}
      onChange={handleChange}
      classes={{
        root: classes.tabsRoot,
        indicator: classes.displayNone,
        scrollButtons: classes.displayNone
      }}
      variant="scrollable"
      scrollButtons="auto"
    >
      {mainTabs.map((prop, key) => {
        return (
          <Tab
            style = {{display:prop.display}}
            onMouseEnter={handleMenuOpen.bind(this,prop.categoryList)}
            classes={{
              root: classes.tabRootButton,
              selected: classes.tabSelected,
              wrapper: classes.tabWrapper
            }}
            key={key}
            label={prop.tabName}
          />
        );
      })}
    </Tabs>
    <Popper open={open} anchorEl={anchorEl} id="menu-list-grow" style={{zIndex:100}}>
      <Paper>
        <MenuList>
          {list && list.map((item, index) => (
            <MenuItem key={index} style={{fontSize:'0.6rem',padding:'0.2rem'}}
            onClick={()=>{handleChoose(item.mainCategory,item.category)}}
            >
              {item.name}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Popper>
  </CardHeader>
  <CardBody style={{padding:0}}>
    {
    mainTabs.map((prop, key) => {
    if (key === value) {
        return <div key={key}>{prop.tabContent}</div>;
    }
    return null;
    })
    }
  </CardBody>
</Card>)
  return (<div style={{height:'413px',display:'flex',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>{torgi}</div>);
}

BidTabs.propTypes = {
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

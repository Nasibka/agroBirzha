import React,{ useEffect,useState,useReducer } from "react";
import classNames from "classnames";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import userNameReducer from '../../reducers/reducers.js'

import Person from "@material-ui/icons/Person";
// core components
import Button from "components/CustomButtons/Button.js";
// import UserNameContainer from "components/UserNameContainer/UserNameContainer.js";


import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import {
  setInStorage,
  getFromStorage
} from '../../utils/storage'

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();
  const history = useHistory();
  const [openProfile, setOpenProfile] = React.useState(null);
  const [token, setToken]=useState('')
  const [userName, setUserName]=useState(null)
  const initialState=(
      <div style={{display:'flex',alignItems:'center'}}>
      <Typography variant='caption' align='center' style={{width:'300px'}}>
        <Link href="/admin/entrance">
          Войти
        </Link>
        &nbsp;или&nbsp;
        <Link href="/admin/registration" >
          Зарегистрироваться
        </Link>
      </Typography>
      </div>
  );
  // const [userNameState, dispatch] = useReducer(userNameReducer,{username:initialState});

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleLogout = ()=>{
    // setOpenProfile(null);

    //delete token from localStorage
    axios.get('http://localhost:5000/users/account/logout?token='+token)
    .then(res=>{
      if(res.data){
          setToken("")
          setUserName(<div><Link>Войти</Link>/<Link>Зарегистрироваться</Link></div>)
          setInStorage('the_main_app',"")
          console.log('logout success')
      }
    })
    history.push('/');
  }
  const handleGoToProfile =()=>{
    setOpenProfile(null);
    if(token){
      history.push('/admin/userProfile'); 
    }else{
      history.push('/admin/entrance'); 
    }
  }

  useEffect(() => {
    // dispatch({ type: GET_USERNAME});

    const obj = getFromStorage('the_main_app')
    if(obj && obj.token){
      axios.get('http://localhost:5000/users/account/verify?token='+obj.token)
      .then(res=>{
        setToken(obj.token)
        setUserName(res.data.userName)
      })
    }
    else{
      setUserName(initialState)
    }

  },[])

  return (
    <div>
      <div className={classes.manager}>
      {/* <UserNameContainer> */}
      {userName} &nbsp;
      {/* </UserNameContainer> */}
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
          style = {{width:'auto',textTransform: 'none'}}
        >
          <Person className={classes.icons} />     
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleGoToProfile}
                      className={classes.dropdownItem}
                    >
                      Профиль
                    </MenuItem>
                    {/* <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Мои заявки
                    </MenuItem> */}
                    <Divider light />
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                      style = {{color:'red'}}
                    >
                      Выйти
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

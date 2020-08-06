import React, {useEffect,useState} from "react";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
//material-ui icons 
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EmailIcon from '@material-ui/icons/Email';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Scenario from "components/Scenario/Scenario.js"
import Modal from "components/Modal/Modal.js"
import { hexToRgb, whiteColor } from "assets/jss/material-dashboard-react.js";
//material-ui core components
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import avatar from "assets/img/faces/marc.jpg";

import {
  getFromStorage,
} from '../../utils/storage'

const styles = {
  cardText: {
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  tabWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabSelected: {
    borderRadius: '10px',
    backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.2)",
    transition: "0.2s background-color 0.1s"
  },
  displayNone: {
    display: "none !important"
  },
  
};

const scenarios = [
  {
    name:'categoryModal',
    title:'Добавить Категорию',
    subTitle:'Заполните все поля',
  },  
  {
    name:'subCategoryModal',
    title:'Добавить Под-Категорию',
    subTitle:'Заполните все поля',
  },  
  {
    name:'sortModal',
    title:'Добавить Сорт',
    subTitle:'Заполните все поля',
  },
  {
    name:'productModal',
    title:'Добавить Продукт',
    subTitle:'Заполните все поля',
  },

]
const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const handleChange = (event, value) => {
    setValue(value);
  };
  //modal for Edit
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //modal for Change Password
  const handleClickOpenPass = () => {
    setOpenPass(true);
  };
  const handleClosePass = () => {
    setOpenPass(false);
  };
  const handleOpenModal = ({ name,title,subTitle }) => {
    setOpenModal(true)
    setName(name)
    setTitle(title)
    setSubTitle(subTitle)
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  };

  useEffect(() => {
    const obj = getFromStorage('the_main_app')
    
    if(obj && obj.token){
      axios.get('http://localhost:5000/users/account/verify?token='+obj.token)
      .then( res=>{
        if(res.data){
          const user = res.data
          console.log(user)
          setUserName(user.userName)

          const a = ([{
            tabName: 'Контакты',
            tabIcon:EmailIcon,
            tabContent:  (
              <GridContainer>
                <GridContainer spacing={1} xs={12} sm={12} md={12} item>
                  <GridItem xs={12} sm={12} md={4}><h5><b>Контакт</b></h5></GridItem>
                  <GridItem xs={12} sm={12} md={3}><h5><b>Статус</b></h5></GridItem>
                </GridContainer>
                <GridContainer spacing={1} xs={12} sm={12} md={12} item>
                  <GridItem xs={12} sm={12} md={4}><p>{user.email}</p></GridItem>
                  <GridItem xs={12} sm={12} md={3}><p>Не подтвержден</p></GridItem>
                </GridContainer>
                <GridContainer spacing={1} xs={12} sm={12} md={12} item>
                  <GridItem xs={12} sm={12} md={4}><p>{user.phoneNumber}</p></GridItem>
                  <GridItem xs={12} sm={12} md={3}><p>Не подтвержден</p></GridItem>
                </GridContainer>
              </GridContainer>
            )
          }])
          const b = ([{
            tabName: 'Контакты',
            tabIcon:EmailIcon,
            tabContent:  (
              <GridContainer >
                <GridContainer spacing={1} xs={12} sm={12} md={12} item>
                  <GridItem xs={12} sm={12} md={4}><h5><b>Контакт</b></h5></GridItem>
                  <GridItem xs={12} sm={12} md={3}><h5><b>Статус</b></h5></GridItem>
                </GridContainer>
                <GridContainer spacing={1} xs={12} sm={12} md={12} item>
                  <GridItem xs={12} sm={12} md={4}><p>{user.email}</p></GridItem>
                  <GridItem xs={12} sm={12} md={3}><p>Не подтвержден</p></GridItem>
                </GridContainer>
                <GridContainer spacing={1} xs={12} sm={12} md={12} item>
                  <GridItem xs={12} sm={12} md={4}><p>{user.phoneNumber}</p></GridItem>
                  <GridItem xs={12} sm={12} md={3}><p>Не подтвержден</p></GridItem>
                </GridContainer>
              </GridContainer>
            )
          },
          {
            tabName: 'Действия',
            tabIcon:CheckCircleOutlineIcon,
            tabContent:  (
              <GridContainer alignItems={'center'} style={{height:'37vh'}}>
              {scenarios.map(props => (
                <Scenario
                  key={props.name}
                  {...props}
                  handleOpenModal={handleOpenModal}
                />
              ))}
              </GridContainer>
            )
          },])

          //Checking ROLES
          if(user.role==='brocker'){
            setTabs(b)
          }else{
            setTabs(a)
          }
        }
      })

    }else{
      history.push('/');
    }
  }, [])


  return (
      <GridContainer style={{padding:'1rem 2rem'}}>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile style={{height:'50vh'}}>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{userName}</h4>
              {/* <h5 className={classes.cardText}>{email}</h5>
              <p className={classes.description}>
                {phoneNumber}
              </p> */}
              <Button color="info" round onClick={handleClickOpen} >
                <EditIcon></EditIcon>
                Редактировать
              </Button><br></br>
              <Button color="danger" round onClick={handleClickOpenPass}>
                <LockOpenIcon></LockOpenIcon>
                Сменить пароль
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Редактировать</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="Имя"
                    type="firstName"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Фамилия"
                    type="lastName"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Почта"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phoneNumber"
                    label="Телефон"
                    type="phoneNumber"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Отмена
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Сохранить
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog open={openPass} onClose={handleClosePass} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Смена пароля</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="currentPass"
                    label="Текущий пароль"
                    type="password"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="newPass"
                    label="Новый пароль"
                    type="password"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="newPassCheck"
                    label="Новый пароль еще раз"
                    type="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePass} color="primary">
                    Отмена
                  </Button>
                  <Button onClick={handleClosePass} color="primary">
                    Сохранить
                  </Button>
                </DialogActions>
              </Dialog>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card profile style={{height:'50vh',color:'gray'}}>
            <CardHeader color='black'>
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
              {tabs.map((prop, key) => {
                var icon = {};
                if (prop.tabIcon) {
                  icon = {
                    icon: <prop.tabIcon style={{ color: prop.tabIconColor,width:'1rem',height:'1rem',margin:'0' }}/>
                  };
                }
                return (
                  <Tab
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
            </CardHeader>
            <CardBody style={{padding:0}}>
              {
              tabs.map((prop, key) => {
              if (key === value) {
                return prop.tabContent;
              }
              return null;
              })
              }
            </CardBody>
          </Card>
        </GridItem>
      <Modal name={name} title={title} subTitle={subTitle} openModal={openModal} onCloseModal={handleCloseModal} />
      </GridContainer>
      
    );
}

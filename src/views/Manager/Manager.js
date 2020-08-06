import React, {useEffect,useState} from "react";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//date-io
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import moment from "moment";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
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
  }
};
moment.locale("ru");
const useStyles = makeStyles(styles);

export default function Manager() {
  const classes = useStyles();
  const [products, setProducts] = useState('');
  const [product, setProduct] = useState('');
  const [categories, setCategories] = useState('');
  const [category, setCategory] = useState('');
  const [types, setTypes] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [volume, setVolume] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
    .then(res=>{
      // console.log(res.data)
      setCategories(res.data);
    });
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCategory = (event) => {
    axios.get('http://localhost:5000/categories/'+event.target.value)
    .then(res=>{
      // console.log(res.data)
      setCategory(event.target.value);
      setProducts(res.data);
    });
  };
  const handleProduct = (event) => {
    axios.get('http://localhost:5000/categories/'+event.target.value)
    .then(res=>{
      // console.log(event.target.value)
      setProduct(event.target.value);
      setTypes(res.data)
    });
  };
  const handleTypes = (event) => {
    axios.get('http://localhost:5000/categories'+event.target.value)
    .then(res=>{setName(res.data.name)})
    setCode(event.target.value.split('/').slice(-1)[0])
    setType(event.target.value)
  }
  function saveProduct(){
    const Product = {
      code:code,
      name:name,
      data:{
        cost:cost,
        selectedDate:selectedDate,
        volume:volume, 
      },
      category:type
    };
    axios.post('http://localhost:5000/products/add',Product)
    .then(res=>console.log(res.data));

    console.log("Product: ", Product);
    setCost("")
    setVolume("")
  }

  return (
    // <div>
      <GridContainer 
      // justify="center" 
      >
       {/* <GridItem xs={12} sm={12} md={6}> */}
          {/* <Card>
            <CardHeader color="black">
              <h4 className={classes.cardTitleWhite}>Добавить Продукт</h4>
              <p className={classes.cardCategoryWhite}>Заполните все поля</p>
            </CardHeader>
            <CardBody> */}
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <InputLabel id="demo-simple-select-helper-label">Категория</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id={code}
                      value={category}
                      onChange={handleCategory}
                    >
                      {categories && categories.map(p=>{
                        return <MenuItem key={p.name} id={p.name} value={p.category}>{p.name}</MenuItem>
                      })}
                    </Select>
                    <FormHelperText>Выберите категорию</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <InputLabel id="demo-simple-select-helper-label">Продукт</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id={code}
                      value={product}
                      onChange={handleProduct}
                    >
                      {products && products.map(p=>{
                        return <MenuItem key={p.name} name={p.name} value={p.category}>{p.name}</MenuItem>
                      })}
                    </Select>
                    <FormHelperText>Выберите продукт</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <InputLabel id="demo-simple-select-helper-label">Сорт</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id={name}
                      value={type}
                      onChange={handleTypes}
                    >
                      {types && types.map(p=>{
                        return <MenuItem key={p.name} id={p.id} value={p.category}>{p.name}</MenuItem>
                      })}
                    </Select>
                    <FormHelperText>Выберите сорт</FormHelperText>
                  </FormControl>
                </GridItem>
              
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Объем"
                    id="volume"
                    value={volume}
                    onChange={e => setVolume(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Цена"
                    id="cost"
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              
                <GridItem xs={12} sm={12} md={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Выберите Дату"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              {/* <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="code"
                    id="code"
                    onChange={e => setCode(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="name"
                    id="name"
                    onChange={e => setName(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
            {/* </CardBody>
            <CardFooter> */}
              <Button color="black" type="submit" onClick = {saveProduct}>Сохранить</Button>
            {/* </CardFooter>
          </Card> */}
        {/* </GridItem> */}
      </GridContainer>
      // {/* </div> */}
  );
}

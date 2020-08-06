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

const useStyles = makeStyles(styles);

export default function Manager() {
  const classes = useStyles();
  const [categories, setCategories] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState('');
  const [product, setProduct] = useState('');
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
    .then(res=>{
      setCategories(res.data);
    });
  }, [])

  const handleCategory = (event) => {
    axios.get('http://localhost:5000/categories/'+event.target.value)
    .then(res=>{
      setCategory(event.target.value);
      setProducts(res.data);
    });
  };
  const handleProduct = (event) => {
    setParent(event.target.value);
    axios.get('http://localhost:5000/categories/'+event.target.value)
    .then(res=>{
      setProduct(event.target.value);
    });
  };

  function saveSortOfProduct(){
    const SortOfProduct = {
      name:name,
      parent:parent,
      category:parent+'/'+path
    };
    axios.post('http://localhost:5000/categories/addCategory',SortOfProduct)
    .then(res=>console.log(res.data));

    console.log("SortOfProduct: ", SortOfProduct);
    setName("")
    setPath("")
  }

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel id="demo-simple-select-helper-label">Категория</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                // id={code}
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
            <InputLabel id="demo-simple-select-helper-label">Под-категория</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                // id={code}
                value={product}
                onChange={handleProduct}
            >
                {products && products.map(p=>{
                return <MenuItem key={p.name} name={p.name} value={p.category}>{p.name}</MenuItem>
                })}
            </Select>
            <FormHelperText>Выберите под-категорию</FormHelperText>
            </FormControl>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={12}>
            <CustomInput
            labelText="Название Сорта (например:Картофель Голландский)"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            formControlProps={{
                fullWidth: true
            }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <CustomInput
            labelText="Код сорта в формате XXX (Например:GLL)"
            id="path"
            value={path}
            onChange={e => setPath(e.target.value)}
            formControlProps={{
                fullWidth: true
            }}
            />
        </GridItem>
        
        <Button color="black" type="submit" onClick = {saveSortOfProduct}>Сохранить</Button>
    </GridContainer>
  );
}

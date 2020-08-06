import React, {useState} from "react";
import axios from 'axios'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";


export default function Manager() {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");

  function saveCategory(){
    const Category = {
      name:name,
      parent:'/',
      category:'/'+path
    };
    axios.post('http://localhost:5000/categories/addCategory',Category)
    .then(res=>console.log(res.data));

    console.log("Category: ", Category);
    setName("")
    setPath("")
  }

  return (
    <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
            <CustomInput
            labelText="Название Категории (например:Овощи)"
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
            labelText="Путь к категории на английском с маленькой буквы (Например:vegetables)"
            id="path"
            value={path}
            onChange={e => setPath(e.target.value)}
            formControlProps={{
                fullWidth: true
            }}
            />
        </GridItem>
        
        <Button color="black" type="submit" onClick = {saveCategory}>Сохранить</Button>
    </GridContainer>
    );
}

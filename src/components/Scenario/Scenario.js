import React from "react";
// @material-ui/core
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

export default function Scenario(props){
    const openModall = () => {
        const {handleOpenModal, title, name, subTitle} = props;
        handleOpenModal({ name, title, subTitle });
    };
    return (
        <GridItem xs={12} sm={12} md={6}>
            <Button  round onClick={openModall} style={{width:'300px'}}>
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
                {props.title}
            </Button>
        </GridItem>
    );
}

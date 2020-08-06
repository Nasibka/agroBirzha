import React from "react";
// @material-ui/core
// import Button from "components/CustomButtons/Button.js";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@material-ui/core";
import Manager from '../../views/Manager/Manager.js'
import CategoryModal from '../Modals/CategoryModal.js'
import SubCategoryModal from '../Modals/SubCategoryModal.js'
import SortModal from '../Modals/SortModal.js'


export default function Modal(props){
    const {openModal, onCloseModal, title, name, subTitle} = props;

    var dialogContent
    switch(name) {
        case "categoryModal":
            dialogContent = (
                <CategoryModal></CategoryModal>
            );
            break;
        case "subCategoryModal":
            dialogContent = (
                <SubCategoryModal></SubCategoryModal>
            );
            break;
        case "sortModal":
            dialogContent = (
                <SortModal></SortModal>
            );
            break;
        case "productModal":
            dialogContent = (
                <Manager></Manager>
            );
            break;
    }

    return (
        <Dialog
            open={openModal}
            onClose={onCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {subTitle}
            </DialogContentText>
            {dialogContent}
            </DialogContent>
            <DialogActions>
            <Button onClick={onCloseModal} color="primary">
                Ок
            </Button>
            {/* <Button onClick={onSave} color="primary">
                Сохранить
            </Button> */}
            </DialogActions>
        </Dialog>
    );
}





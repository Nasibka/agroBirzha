const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    data: { type : Array , "default" : [] },
    category:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    }
},{timestamps:true,
})

const Product = mongoose.model('Product',productSchema,'products');

module.exports = Product;
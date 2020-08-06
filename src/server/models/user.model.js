const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    lastName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    password: { 
        type: String, 
        required: true 
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true,
})

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
const User = mongoose.model('User',userSchema);

module.exports = User;
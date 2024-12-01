const mongoose=require('mongoose');

//Create Schema
const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type:string,
    },
    email:{
        type:string,
        required:true,
        unique:true,
    },
    gender:{
        type:string,
    },
    jobTitle:{
        type:string,
    },
    },
    {timestamps:true}
);

//Create Model for User Schema
const User=mongoose.model('user',userSchema);

module.exports=User;

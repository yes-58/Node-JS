//Controllers contains the function which we want to attach with our routes

const User = require('../models/user');

async function handleGetAllUsers(req,res) {
    const allDBUsers=await User.find({});
    return res.json(allDBUsers);
}

async function handelGetUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    return res.json(user);
}

async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.json({msg:"success"});
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.send({msg:"User Deleted Successfully"});  
}

//Post Request
async function handleCreateNewUser(req,res) {
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All Fields are required."});
    }
    //Creates new user and return it in result
    const result=await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:job_title
    });
    console.log("result",result);
    return res.status(201).json({msg:"User Created Successfully.",id: result._id});
    
}
module.exports={
    handleGetAllUsers,
    handelGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}
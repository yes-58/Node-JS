const express=require('express');
const app=express();
const mongoose=require('mongoose');
const fs=require('fs');
const users=require('./MOCK_DATA.json');
const { type } = require('os');
const PORT=8000;

//Connection to database
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>console.log("MongoDB Connected")).catch((err)=>console.log("Mongo Error",err));
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
//Create Model
const User=mongoose.model('user',userSchema);

//Middleware
app.use(express.urlencoded({extended:false}));
//Middleware 1 and changing request object by adding additinal property username in it.
app.use((req,res,next)=>{
    req.username="Gourav";
    console.log("Middleware 1");
    next();
})
//Middleware to write log in file of URL access by client
app.use((req,res,next)=>{
    fs.appendFile('./log.txt',`\n${Date.now()}:${req.hostname}:${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
})

//Routes
//Hybrid Server Request if client is browser or mobile app
app.get('/users',(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

//Dynamic Request, fetching the data of any user using ID
app.get('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=> user.id===id);
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    return res.json(user);
})

//Post Request
app.post('/api/users',(req,res)=>{
    const body=req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All Fields are required."});
    }
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success",id:users.length});
    });
});

//Updating User Data
app.patch('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const body=req.body;
    // Find the user to update
    const user=users.find((user)=> user.id===id);
    if (!user) {
        return res.status(404).json({ status: "User not found" });
    }
    // Merge existing user data with the new data in `body`
    const updatedUser = { ...user, ...body };
    // Find the index of the user and update it in the array
    const userindex=users.indexOf(user);
    users.splice(userindex,1,updatedUser);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if (err) {
            return res.status(500).json({ status: "Error writing file" });
        }
        return res.json({ status: "success", user: updatedUser });
    });
})
//Deleting User Data
app.delete('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=> user.id===id);
    const userindex=users.indexOf(user);
    //deleting user from array
    users.splice(userindex,1);
    //Updating the Json file with new array
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if (err) {
            return res.status(500).json({ status: "Error writing file" });
        }
        return res.json({ status: "success", user: user });
    });

})
app.listen(PORT,()=>{console.log('Server Started')});

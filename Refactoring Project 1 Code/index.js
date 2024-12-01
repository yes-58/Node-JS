const express=require('express');
const {connectMongoDb}=require('/connection')

const {logReqRes}=require('./middlewares')

//Importing Routers
const userRouter=require('./routes/user')

const app=express();
const PORT=8000;
//DB Connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>console.log("MongoDB Connected")).catch((err)=>console.log("Mongo Error",err));

//Middleware
app.use(express.urlencoded({extended:false}));

//Middleware to write log in file of URL access by client
app.use(logReqRes("log.txt"));

//Routes
//Use userRouter if any request comes on /api/users.
app.use('/api/users',userRouter);

app.listen(PORT,()=>{console.log('Server Started')});

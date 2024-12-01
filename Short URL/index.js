const express=require('express');
const path=require('path');
const cookieParser = require('cookie-parser')
const {connectToMongoDb} = require("./connect")
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth')
const urlRoute = require('./routes/url')
const staticRoute= require('./routes/staticRouter')
const userRoute = require('./routes/user')

const app=express();
const PORT=8000;

//Connect Database
connectToMongoDb("mongodb://localhost:27017/short-url").then(()=>{console.log('MongoDB Connected')}).catch((err)=>{console.log('Error in Connecting MongoDB')});

//Setting up view engine and views path
app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser);


//Routes
app.use('/url',restrictToLoggedInUserOnly,urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);

app.listen(PORT,()=>{console.log(`Server Started on Port No ${PORT}`)});

const http=require('http');
const express=require('express');
const port=8000;
const app=express();

app.get('/',(req,res)=>{res.send('Home Page')});
//app.get('/about',(req,res)=>{res.send('About Page')});
//Using Query Parameters
app.get('/about',(req,res)=>{res.send('About Page '+'UserName : '+req.query.name+' Age : '+req.query.age)}) 

app.listen(port,()=>{console.log('Server Started')});

//Showing below internally express is using http module and app is just act like a Handler function.
//const server=http.createServer(app);
//server.listen(port,()=>{console.log('Server Started')});
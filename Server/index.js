const express=require('express');
const app=express();
const mysql=require("mysql2");
const cors =require("cors");
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"healthcaredb"
});
 
app.post('/register',(req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;
    db.query("INSERT INTO user(username,password) VALUES(?,?)",
    [username,password],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("value inserted");
        }
    });
});
app.post('/login',(req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;
    db.query("SELECT * FROM user WHERE username=? AND password=?",
    [username,password],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            
            res.send(result);
        }else{
            res.send({message:"Wrong username/password"});
         }
    });
});


app.listen(8080,()=>{
    console.log("server running");
});
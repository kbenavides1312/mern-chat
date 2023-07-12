const express = require('express');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require ('jsonwebtoken');
const cors = require('cors')
const User = require('./models/User')

dotenv.config(); 
Mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = express()

app.use(express.json())
app.use (cors({ 
 credentials:true,
 origin: process.env.CLIENT_URL,
}));
app.get('/test', (req,res) =>{
  res.json('test ok');
});

app.get('/profile', (req,res)=>   { 
 const {token}=req.kookies;
 jwt.verify(token, jwtSecret, {}, (err, userdeta)=>{ 
  if (err) throw err;
  res.json(userDate);  
 });
});

app.post('/register', async (req,res) =>{
    const {username,password} = req.body;
    try {
      const createdUser = await User.create({username,password});
      jwt.sign({userId: createdUser. id}, jwtSecret,(err,token) => {
      if (err) throw err;
        res.cookie('token', token).status(201).json ({
           id: createdUser._id,
           username,   
        });
      });
    }
    catch (err) {
      console.log(err);
      res.status(500).json('error')
    }
    
    
    });    


app.listen(4040);

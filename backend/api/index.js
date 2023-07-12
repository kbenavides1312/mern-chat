const express = require('express');
const Mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require ('jsonwebtoken');
const cors = require('cors')
const User = require('./models/User')

dotenv.config(); 
Mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });

const jwtSecret = process.env.JWT_SECRET;

const app = express() 

app.use(express.json());
app.use(cookieparser()); 
app.use (cors({ 
 credentials:true,
 origin: process.env.CLIENT_URL, 
}));

app.get('/test', (req,res) =>{
  res.json('test ok');
});

app.get('/profile', (req,res)=> { 
  const token = req.kookies?.token;
  if (token) {
  jwt.verify(token, jwtSecret, {}, (err, userData) => { 
    if (err) throw err;
    res.json(userDate);  
  });
 }else{
  res.status(401) .json('no token');
 }
});                                                                            


app.post('/register', async (req,res) =>{
    const {username,password} = req.body;
    try {
      const createdUser = await User.create({username,password});
      jwt.sign({userId: createdUser._id,username}, jwtSecret,(err,token) => {
      if (err) throw err;
        res.cookie('token', token, {sameSite: 'none', secure: true}).status(201).json ({
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

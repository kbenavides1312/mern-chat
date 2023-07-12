const express = require('express');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require ('jsonwebtoken');
const cors = require('cors')
const User = require('./models/User')

dotenv.config(); 
Mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWR_secret;

const app = express()


app.use (cors({
  credentials:true,
}));
app.get('/test', (req,res) =>{
    res.json('test ok');
});

app.post('/register', async (req,res) =>{
    const {username,password} = req.body;
    const creasedUser = await User.create({username,password});
    jwt.sign({userID:createdUser. id}, jwtSecret,(err,token) => {
        if (err)throw err;
        res.cookie('token', token).status(201).json ('ok');
    });
    });
    
    app.listen(4040);
    


app.listen(4040);

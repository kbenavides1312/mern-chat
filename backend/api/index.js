const express = require('express');
const dotenv = require ('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();

console.log(process.env.MONGO_URL);
app.get('/test' , (req,res) =>{
    res.json('test ok');
});

app.post('/register',async(req,res)=>{
const {usarname,password} =req.body;
await User.create ({usarname,password});

});

app.listen(4000);

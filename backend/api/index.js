const express = require('express');
require.dotenv = ('dotenv');

dotenv.config();
console.log(process.env.MONGO_URL);
const app = express()

app.get('/test', (req,res) =>{
    res.json('test ok');
});

app.post('/register',(req,res) =>{

});

app.listen(4040);


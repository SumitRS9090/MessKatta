const express = require('express');

const app = express();

require('dotenv').config();

const bodyparser = require('body-parser');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:'https://messkatta.netlify.app',
    methods:'GET,POST,PUT,DELETE',
    credentials:true,
}));

app.options('*', cors());

require('./Models/config');

app.get('/',(req,res)=>{
    res.json('Hello');
});

app.use('/auth',require('./Routes/Auth'));

app.use('/profile',require('./Routes/Profile'));

app.use('/menu',require('./Routes/Menu'));

app.listen(PORT,()=>{
    console.log('Server started');
})

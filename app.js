const express = require('express');
const app = express();
const PORT = 4300 ;
require('./connection');
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.set('view engine','ejs')
const route = require('./router');
const defaultAdmin = require('./default')
defaultAdmin();
app.use('/', route)

app.listen(PORT,()=>{
    console.log("server running at port " + PORT)
})
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/project1",
    (err)=>{
        if(err) console.log(err)
        else  console.log("connection established");
})
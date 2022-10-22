const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type : 'string', required: true},
    email: {type : 'string', required: true},
    username: {type : 'string', required: true, unique: true},
    password: {type : 'string', required: true },
    role : {type : 'string'},
})

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;
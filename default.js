const UserModel = require('./models/usermodel')

let defaultAdmin = async()=>{
    let data = await UserModel.findOne({username:"admin"});
    if(data) return null ;
    let autoAdmin = new UserModel({
        name:"Nikunj",
        email:"nikunj@gmail.com",
        username:"admin",
        role:"admin",
        password:"admin123"
    })

    autoAdmin.save();
}

module.exports = defaultAdmin;
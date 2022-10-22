var jwt = require('jsonwebtoken');
const privateKey = "thisismyprivatekey";
const UserModel = require('../models/usermodel')

module.exports.generateToken = (data)=>{
    var token = jwt.sign({ userId: data }, privateKey);
    return token ;
}

module.exports.tokenVerify = async(req,res,next)=>{
try {
    let token = req.cookies.token;
    if (!token) return res.render('index');
    
    let userId = jwt.verify(token,privateKey);
    if (!userId) return res.render('index');

    let user = await UserModel.findById({_id:userId.userId});
    req.user = user;
    next();
} catch (error) {
    console.log(error);
    res.render('index')
}

}

module.exports.isAdmin = async(req,res,next)=>{
    try {
        let token = req.cookies.token;
        if (!token) return res.render('index');
        
        let userId = jwt.verify(token,privateKey);
        if (!userId) return res.render('index');
        
        let user = await UserModel.findById({_id:userId.userId});
        if(!user.role) return res.render('index');
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.render('index')
    }
}
const UserModel = require('../models/usermodel');
const {generateToken} = require('../middleware/auth');

class userController {
    static register = async(req,res,next)=>{
      try {
        const { name,email,username,password,confirm_password,role} = req.body;
        if( !name|| !email|| !username|| !password|| !confirm_password ) return res.json({"message":"all fields are required"});
        if( password !== confirm_password) { return res.json({"message":"password and confirm password must be same"});              
        }
        let existingUser = await UserModel.findOne({username:username});
        if(existingUser) return res.json({"message":"username already present"});
        const newUser = new UserModel({
            name:name,
            email:email,
            username:username,
            password:password,
            role:role,
        });

        await newUser.save();
        res.render('index');
      } catch (error) {
        res.json(error);
      }
    }

    static login = async(req,res,next)=>{
       try {
        const {username , password} = req.body;
        if(!username || !password) return res.json({"message":"please provide valid credentials"});
        let user = await UserModel.findOne({username:username});
        if(!user) return res.json({"message":"user not found please register first"});
        if(user.password !== password) return res.json({"message":"invalid credentials"});
        let token = generateToken(user._id);
        res.cookie('token',token);
        res.render('home',{user})
       } catch (error) {
        console.log(error)
        res.json(error);
       }
    }

    static getUserData = async (req,res,next)=>{
        try {
            let user = req.user;
            res.render('home',{user})
        } catch (error) {
            res.json(error)
        }
    }
    static updateUserData = async(req,res,next)=>{
        const user = req.user;
        const {name,email}= req.body;
        let data = await UserModel.findByIdAndUpdate(user._id,{$set:{
            name:name,
            email:email,
        }})
        await data.save();
        let updateduser = await UserModel.findOne({_id:data._id});
        res.render('home',{user:updateduser});
    }

    static deleteAccount = async(req,res,next)=>{
        const id = req.params.id;
        let data = await UserModel.findByIdAndDelete({_id:id});
        if(!req.user.role){
        return res.redirect('/');}
        res.redirect('/allUserData')
    }
    static updatedata = async(req,res,next)=>{
        let user = req.user;
        res.render('update',{user})
    }

    static allUserData = async(req,res,next)=>{
        let data = await UserModel.find();
        res.render('alluser',{data})
    }
    static notfound = async(req,res,next)=>{
        res.render('404')
    }
    static logout = async(req,res,next)=>{
        res.cookie.token = '';
        res.redirect('/');
    }
} 

module.exports = userController;
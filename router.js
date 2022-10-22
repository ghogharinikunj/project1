const router = require('express').Router();
const userController = require('./controllers/usercontroller');
const {tokenVerify,isAdmin} = require('./middleware/auth');


router.get ('/',(req,res,next)=>{
    res.render('index')
})


router.post('/registration',userController.register)
router.post('/login',userController.login)
router.get('/logout',userController.logout)

// router.use(tokenVerify);
router.get('/profile',tokenVerify,userController.getUserData)
router.get('/updatedata',tokenVerify,userController.updatedata)
router.post('/updatedata',tokenVerify,userController.updateUserData)
router.get('/deleteaccount/:id',tokenVerify,userController.deleteAccount)
router.get('/allUserData',isAdmin,userController.allUserData)
router.get('/*',userController.notfound)


module.exports = router;
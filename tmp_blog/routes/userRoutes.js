const express=require('express')
const { getAllUsers, registerController, loginController, singleusercontroller } = require('../controllers/userController');

const router=express.Router();

// // router.get('/alluser',callbackfn)
// // we can write callbackfn here also but we have to follow a stabdard structure of project mvc
// //get all user || get
router.get('/all-users',getAllUsers);

// //create user||post
router.post('/register',registerController)

// //login user||post
router.post('/login',loginController);

router.get('/singleuser/:id',singleusercontroller)

module.exports=router;
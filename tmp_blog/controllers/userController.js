// const userModel=require('../models/userModel')
const userModel=require('../models/userModel')
const bcrypt=require("bcrypt");

/////get single user
exports.singleusercontroller=async(req,res)=>{
    try{
        const { id } = req.params;
const users=await userModel.findById(id);
// console.log(users);
if(!users){
    return res.status(400).send({
        success:false,
        message:"user not found",
        users
    })
}
return res.status(200).send({
    userCount:users.length,
    success:true,
    message:"all users data",
    users

})
    }catch(error){
        return res.status(500).send({
            message:"error in get single user",
            success:false,
            error
        })
    }
}

//create/ register user
exports.registerController=async(req,res)=>{
try{
//fetch data from req bod
const {username,email,password,confirmpassword}=req.body
console.log(req.body);
//validation
console.log(password);
console.log(confirmpassword);
if(!username||!email||!password||!confirmpassword){
    return res.status(400).send({
        message:'please fill all the field',
        success:false,
    })
} 
//check for existing user
const existinguser=await userModel.findOne({email})
if(existinguser){
    return res.status(400).send({
        message:"user with this email is already exist try to login or use another email",
        success:false,
    })
}
if(password!==confirmpassword){
    return res.status(400).send({
        message:"password mismatch",
        success:false,
    })
}
//has the password before save
const hassedpassword=await bcrypt.hash(password,10)
const hassedconfirmpassword=await bcrypt.hash(confirmpassword,10)
//here 10 is the value of salt

///save new user
//because we have already check the equality of password and confirm password so we can used same 
// hassed password for validation purpose
const user = new userModel({username,email,password:hassedpassword,confirmpassword:hassedpassword});
await user.save();

return res.status(201).send({
    success:true,
    message:"new user created",
    user,
})
}catch(error){
    console.log(error);
    return res.status(500).send({
        message:"error in register callback",
        success:false,
        error
    })
}
}
//getting all users
exports.getAllUsers=async(req,res)=>{
try{
const users=await userModel.find({});
return res.status(400).send({
    userCount:users.length,
    success:true,
    message:"all users data",
    users

})
}catch(error){
    console.log(error);
    return res.status(200).send({
        success:false,
        message:"error while getting all user",
        error
    })
}
};
//login user
exports.loginController=async(req,res)=>{
try{
 const {email,password}=req.body
 if(!email){
    return res.status(400).send({
        success:false,
        message:"fill the email",
    })
 }
 console.log('email');
 if(!password){
     return res.status(400).send({
         success:false,
         message:"please provide the valid password",
        })
    }
    console.log('password');
    const existing=await userModel.findOne({email})
    if(!existing){
        return res.status(200).send({
            success:false,
            message:"this email is not exist try another"
        })
    }
    console.log('exist');
    const ismatch=await bcrypt.compare(password,existing.password);
    if(!ismatch){
        return res.status(401).send({
            success:false,
            message:"invald email or password"
        })
    }
    console.log('success');
res.status(200).send({
    success:true,
    message:"login successfull",
    existing
})
}catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"error in login",
        error
    })
}
}
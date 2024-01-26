const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcrypt");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength:6
  },
  confirmpassword: {
    type: String,
    required: [true, "Please Enter same Password to confirm"],
    minLength: 6,
    validate: {
      validator: async function (confirmpassword) {
        return this.password===this.confirmpassword;
      },
      message: "Passwords do not match",
    },
  },
  isLikedInitially:{
    type: Number,
    default: 0,
  },
  blogs:[
    {
      type:mongoose.Types.ObjectId,
      ref:'Blog'
    }
  ]
  ,
  liked: [  // Adding the 'liked' array
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog'  // You should replace 'SomeOtherModel' with the actual model name you're referring to
    }
  ]
},{timestamps:true});

// console.log("*");
// console.log(this);
// console.log("*");
//User collection are created
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;
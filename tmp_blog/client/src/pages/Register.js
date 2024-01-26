import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
const Register = () => {
  const navigate = useNavigate();

  //state

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:"",
  });

  ///
  const handlechange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    try {
      const {data}=await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
        confirmpassword:inputs.confirmpassword,
      });
      if(data.success){
        toast.success('user registered successfully')
        navigate("/login");
      }else{
        // alert('user not register somthing is not well')
        toast.error('user not register somthing is not well')
      }
    } catch (error) {
      toast.error("password must be minimum length of 6 and password and confirm password match");
      console.log(error);
    }
  };
  return (
    // <div>Register</div>
    <>
      {/* <h1>Register</h1> */}
      <form onSubmit={handlesubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign={"center"}
          >
            Register
          </Typography>
          <TextField
            value={inputs.name}
            onChange={handlechange}
            placeholder="name"
            name="name"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            value={inputs.email}
            onChange={handlechange}
            placeholder="email"
            name="email"
            margin="normal"
            type={"email"}
            required
          />
          <TextField
            value={inputs.password}
            onChange={handlechange}
            placeholder="password"
            name="password"
            margin="normal"
            type={"password"}
            required
          />
          <TextField
            value={inputs.confirmpassword}
            onChange={handlechange}
            placeholder="confirm password"
            name="confirmpassword"
            margin="normal"
            type={"password"}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            type="submit"
            //   variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Register ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;

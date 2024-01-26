import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import './bgc.css'
const CreateBlog = () => {
  const navigate=useNavigate()
  const id=localStorage.getItem('userId')
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try{
     const {data}=await axios.post('/api/v1/blog/create-blog',{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:id
     });
     if(data?.success){
      toast.success('blog created');
      // alert('blog created');
      navigate('/my-blogs');
      
     }
    }catch(error){
      console.log(error);
    }
  };
  const handleChange=(e)=>{
    setInputs(prevState=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }
  return (
    // <div>CreateBlog</div>
    <>
      {/* <h1>create blog</h1> */}
      <Box className='form1'
      >

      <form onSubmit={handleSubmit}
      >
        <Box
        className='create'
        width="45%"
        border={3}
        borderRadius={10}
        padding={2}
        margin={"auto"}
        boxShadow={"10px 10px 20px #ccc"}
        display={"flex"}
        flexDirection={"column"}
        marginTop="0px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color={"gray"}
            >
            Post your Social Life
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px",fontWeight:'bold' }}>Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange} variant="outlined" margin="normal" required/>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px",fontWeight:'bold' }}>Description</InputLabel>
          <TextField name='description' value={inputs.description} onChange={handleChange} variant="outlined" margin="normal" required/>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px",fontWeight:'bold' }}>Image Url</InputLabel>
          <TextField name='image' value={inputs.image} onChange={handleChange} variant="outlined" margin="normal" required/>

          <Button type="submit" color='primary' variant="contained">Create</Button>
        </Box>
      </form>
            </Box>
    </>
  );
};

export default CreateBlog;

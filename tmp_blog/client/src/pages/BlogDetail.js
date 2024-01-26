import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast';
import './bgc.css'
// import toast from 'react-hot-toast'
const BlogDetail = () => {
    const [blog,setBlog]=useState([])
    const id=useParams().id;
    const navigate=useNavigate();
    const [inputs, setInputs] = useState({
       
      });
//get blog detail
const getBlogDetail=async()=>{
try{
    const {data}=await axios.get(`/api/v1/blog/get-blog/${id}`)
    // console.log(data);
    if(data?.success){
        setBlog(data?.userblog)
        ///get initial data
        setInputs({
        title:data?.userblog.title,
        description:data?.userblog.description,
        image:data?.userblog.image
    })
    }
}catch(error){
    console.log(error)
}
}
useEffect(()=>{
    getBlogDetail()
},[id]);

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try{
     const {data}=await axios.put(`/api/v1/blog/update-blog/${id}`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:id
     });
     if(data?.success){
      // alert('blog updated');
      toast.success('blog updated successfully')
      navigate('/my-blogs')
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

// console.log(blog);
  return (
    // <div>BlogDetail</div>
    <>
    <Box className='form1'>

    <form onSubmit={handleSubmit}>
        <Box
        className='create'
        width="45%"
          border={3}
          borderRadius={10}
          padding={3}
          margin={"auto"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color={"gray"}
          >
            Update Your Post1
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px",fontWeight:'bold' }}>Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange} variant="outlined" margin="normal" required/>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px",fontWeight:'bold' }}>Description</InputLabel>
          <TextField name='description' value={inputs.description} onChange={handleChange} variant="outlined" margin="normal" required/>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px",fontWeight:'bold' }}>Image Url</InputLabel>
          <TextField name='image' value={inputs.image} onChange={handleChange} variant="outlined" margin="normal" required/>

          <Button type="submit" color='warning' variant="contained">Update</Button>
        </Box>
      </form>
          </Box>
    </>
  )
}

export default BlogDetail
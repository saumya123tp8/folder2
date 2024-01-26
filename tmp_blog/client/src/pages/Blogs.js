import axios from 'axios';
import React,{useState,useEffect} from 'react'
import BlogCard from '../components/BlogCard';
import './bgc.css'
import { Box } from '@mui/material';
///usestte where we can hold card 
///useeffect that we have must required lifecycle so that we can get blog at initial time

const Blogs = () => {
  const [blogs,setBlogs]=useState([]);
  //get blogs
  const getAllBlogs=async()=>{
    try{
    const {data}=await axios.get('api/v1/blog/all-blog')
    if(data&&data.success){
      setBlogs(data?.blogs);
    }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllBlogs();
  },[])
  // console.log(blogs)
  return (
    // <div>Blogs</div>
    <>
    <Box className="over">

      {
        blogs&&blogs.map(blog=>(
          <BlogCard 
          id={blog&&blog?._id}
          isUser={localStorage.getItem('userId')===blog?.user?._id}
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          username={blog?.user?.username}
          time={blog?.createdAt}
          //tony
          likes={blog?.likes}
          isLiked={blog?.user?.isLikedInitially}
          //tony
          />
          // <h1>hii</h1>
          ))
        }
      {/* <h1>hii</h1> */}
        </Box>
    </>
  )
}

export default Blogs
import './bgc.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box } from '@mui/material';

const Fav = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [likedBlog, setLikedBlog] = useState([]);

  // Get liked blogs
  const getUserLikedBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
    //   console.log(data?.userBlog?.liked);
      if (data?.success) {
        setLikedBlogs(data?.userBlog?.liked);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
      getUserLikedBlogs();
    },[])
  const fetchLikedBlogsDetails = async () => {
    try {
        const detailedBlogs = await Promise.all(
            likedBlogs.map(async (likedBlogId) => {
          const { data } = await axios.get(`/api/v1/blog/get-blog/${likedBlogId}`);
        //   console.log(data);
          return data?.userblog;
        })
      );
    //   console.log(detailedBlogs);
      setLikedBlog(detailedBlogs);
    } catch (error) {
        // console.log('*&*')
      console.log(error);
    }
  };
  useEffect(()=>{
    if (likedBlogs.length > 0) {
    fetchLikedBlogsDetails()
    }
  },[likedBlogs]);
  console.log(likedBlogs)
  console.log(likedBlog)
  return (
    <div>
        <Box className='over'>

      {likedBlog && likedBlog.length > 0 ? (
          likedBlog?.map((blog) => (
          <BlogCard
          key={blog?._id}
          id={blog?._id}
          isUser={localStorage.getItem('userId')===blog?.user?._id}
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          // username={blog?.user.username}
          time={blog?.createdAt}
            likes={blog?.likes}
            isLiked={blog?.user?.isLikedInitially}
          />
        ))
      ) : (
        <h1>You Haven't Liked Any Blogs</h1>
        )}
        </Box>
    </div>
  );
};

export default Fav;

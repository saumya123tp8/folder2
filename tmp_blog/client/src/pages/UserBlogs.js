import React, { useState, useEffect } from "react";
import axios from "axios";
import './bgc.css'
import BlogCard from "../components/BlogCard";
import { Box } from "@mui/material";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blogs)
  useEffect(() => {
    // handleBlogDelete();
    getUserBlogs();
  }, []);
  const handleBlogDelete = (deletedBlogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== deletedBlogId));
  };
  console.log(blogs)
  // console.log(blogs);
  return (
    <div>
      <Box className='over'>

      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
          id={blog?._id}
          isUser={true}
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          username={blog?.user.username}
          time={blog?.createdAt}
          //tony
          onDelete={() => handleBlogDelete(blog._id)}
          likes={blog?.likes}
          isLiked={blog?.user?.isLikedInitially}
          //tony
          />
          ))
          ) : (
            <h1>You Havent Created a blog</h1>
            )}
            </Box>
    </div>
  );
};

export default UserBlogs;
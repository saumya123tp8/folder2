import * as React from "react";
import "./blogcard.css";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import moment from "moment";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import axios from "axios";
import toast from "react-hot-toast";
export default function BlogCard({
  id,
  isUser,
  title,
  description,
  image,
  username,
  time,
  likes,
  isLiked,
}) {
  const [like, setLike] = useState({
    likes: likes,
    isLiked: localStorage.getItem(`liked_${id}`) === "1",
  });
  const [chk, setChk] = useState(
    localStorage.getItem(`liked_${id}`) === "1" ? 1 : 0
  );
  const navigate = useNavigate();
  const userid = localStorage.getItem("userId");
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (isConfirmed) {
      try {
        const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
        if (data?.success) {
          toast.success("blog deleted successfully");
          // alert('blog deleted successfully');

          navigate("/my-blogs");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "     ...";
  };

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const fullblog = () => {
    navigate(`/full-blog/${id}`);
  };
  const handleLikes = async () => {
    try {
      // const bloglike=await axios.
      const response = await axios.post(
        `/api/v1/blog/like-blog/${id}/${userid}`
      );
      console.log(response?.data);
      if (response?.data?.success) {
        const array = response?.data?.user?.liked;
        // console.log(array);
        if (array.includes(id)) {
          setLike((prevLike) => ({
            likes: response?.data?.blog?.likes,
            isLiked: true,
          }));
          setChk(1);
          localStorage.setItem(`liked_${id}`, "1");
        } else {
          setLike((prevLike) => ({
            likes: response?.data?.blog?.likes,
            isLiked: false,
          }));
          setChk(0);
          localStorage.setItem(`liked_${id}`, "0");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // handleLikes()
  }, []);
  return (
    <Box className="box">
      <Card
        className="card"
        sx={{
          width: "80%",
          margin: "auto",
          mt: 2,
          mb: 2,
          padding: 1,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {username}
              </Avatar>
            }
            title={username}
            // subheader={time}
            subheader={moment(time).format("MMMM Do YYYY, h:mm:ss a")}
          />
          {isUser && (
            <Box display={"flex"}>
              <IconButton onClick={handleEdit}>
                <ModeEditIcon color="primary" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          )}
        </Box>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Oooops Not Found"
        />
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6" color="text.primary">
              TITLE : {title}
            </Typography>
            <Box display={"flex"}>
              <IconButton onClick={handleLikes}>
                <FavoriteIcon color={like.isLiked ? "error" : "inherit"} />
                {/* <FavoriteIcon color={chk? 'error' : 'inherit'}/> */}
              </IconButton>
              <Typography variant="h6" color="text.primary" marginTop={"5px"}>
                {like.likes}
              </Typography>
              {/* like */}
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box marginBottom={1}>
              <Typography variant="body2" color="text.secondary">
                DESCRIPTION : {truncateDescription(description, 10)}
              </Typography>
            </Box>
            <Box
              marginBottom={-2}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <ReadMoreIcon
                sx={{ fontSize: 30, cursor: "pointer", marginLeft: "5px" }}
                onClick={fullblog}
              />
              <AddCommentIcon
                sx={{ fontSize: 30, cursor: "pointer", marginLeft: "10px" }}
                onClick={fullblog}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

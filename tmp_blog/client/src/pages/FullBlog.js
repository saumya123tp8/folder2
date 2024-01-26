import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  DialogContent,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./bgc.css";
import moment from "moment";
var initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const getColorFromLetter = (letter) => {
  // Define a mapping of colors based on letters
  const colorMap = {
    A: "red",
    B: "blue",
    C: "green",
    D: "purple",
    E: "orange",
    F: "pink",
    G: "teal",
    H: "brown",
    I: "gray",
    J: "cyan",
    K: "magenta",
    L: "indigo",
    M: "CadeBlue",
    N:"AntiqueWhite",
    P:"Aqua",
    R:"Azure",
    S: "Olive",
    T:"OliveDrab",
    U:"Beige",
    V:"Bisque",
    Y:"DarkCyan"
    // Add more letters and colors as needed
  };

  // Get the color from the mapping or default to black
  return colorMap[letter.toUpperCase()] || "black";
};

const FullBlog = () => {
  const [blog, setBlog] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [comment, setComment] = useState(initialValue);
  const [singleComm, setSingleComm] = useState("");
  const [cmt, setCmt] = useState([]);
  const [nm, setNm] = useState("");
  //get blog detail
  let time;
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength);
  };
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.userblog);
        setInputs({
          title: data?.userblog.title,
          description: data?.userblog.description,
          image: data?.userblog.image,
        });
        time = data?.userblog.updatedAt;
      }
    } catch (error) {
      console.log(error);
    }
  };

  /////get all comment on the post

  const getAllCmt = async () => {
    try {
      const { data } = await axios.get(`/api/v1/cmt/comments/${id}`);
      // const { data } = await axios.get(`https://ooops-posted.onrender.com/api/v1/cmt/comments/${id}`);
      if (data?.success) {
        setCmt(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

const finduser=async()=>{
  try {
    const userid = localStorage.getItem("userId");
    const data1 = await axios.get(`/api/v1/user/singleuser/${userid}`);
    if(data1?.success){
      setNm(data1?.data?.users?.username);
      console.log(nm);
    }
  } catch (error) {
    toast.error("user not fetched");
    console.log(error);
  }
}

  /////commment
  const addComment = async () => {
    try {
      const userid = localStorage.getItem("userId");
      // console.log(userid);
      const data1 = await axios.get(`/api/v1/user/singleuser/${userid}`);
      setNm(data1?.data?.users?.username);
      console.log(nm);
      // const { data } = await axios.post("https://ooops-posted.onrender.com/api/v1/cmt/comment/new", {
      const { data } = await axios.post("/api/v1/cmt/comment/new", {
      name: data1?.data?.users?.username,
      postId: id ,
      date: new Date(),
      comments: singleComm,
      });
      if (data?.success) {
        toast.success("comment is added");
        setComment({
          name: nm,
          postId: id,
          date: new Date(),
          comments: singleComm,
        });
        console.log(comment);
        getAllCmt();
      } else {
        toast.error("comment is not added");
      }
    } catch (error) {
      toast.error("comment is not posted");
      console.log(error);
    }
  };
  useEffect(() => {
    finduser();
    getBlogDetail();
  }, []);
  useEffect(() => {
    getAllCmt();
  }, []);
  
  const handleChange = (e) => {
    // setComment({
    //   ...comment,
    //   // ...cmt,
    //   // postId: id,
    //   comments: e.target.value,
    // });
    setSingleComm(e.target.value);
  };


  // Fetch comments after adding a new comment
  // console.log(cmt);
  return (
    // <div>BlogDetail</div>
    <>
      <Box
        className="box2"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        margin={0}
        width='100%'
      >
        <Box
          className="box3"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height="100%"
          margin={2}
          sx={{
            "@media (max-width: 600px)": {
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          }}
        >
          {/* <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} height={30} margin={2}> */}
          <Typography
            variant="h4"
            // color="text.primary"
            sx={{
              "@media (max-width: 600px)": {
              //  variant:'h8'
              fontSize:'20px',
              },    
            }}
          >
            TITLE : {inputs.title}
          </Typography>
          <Typography marginLeft="9%" sx={{
              "@media (max-width: 600px)": {
              //  variant:'h8'
              fontSize:'10px',
              marginLeft:'30%'
              },    
            }}>
            Blog Posted On:{moment(time).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </Box>
        <Card 
        className="card"
        sx={{
          height:"10%",
          // width: "96.5%",
          // height:"100%",
          margin: "auto",
          mt: 2,
          mb: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
        >
          
          <DialogContent>
            <img
              src={inputs.image}
              alt="Full Image"
              style={{ width: "100%", height: "auto" }}
            />
          </DialogContent>
        </Card>
        <Box>
          <Typography>
            {/* {inputs.description} */}
            <Card
              className="card"
              sx={{
                width: "96.5%",
                // height:"100%",
                margin: "auto",
                mt: 2,
                mb: 2,
                padding: 5,
                boxShadow: "5px 5px 10px #ccc",
                ":hover:": {
                  boxShadow: "10px 10px 20px #ccc",
                },
              }}
            >
              {inputs.description}
            </Card>
          </Typography>
        </Box>
        <Box
          marginLeft={1}
          marginRight={4}
          marginBottom={2}
          width="100%"
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <AccountCircleIcon
            sx={{ fontSize: 80, cursor: "pointer", marginLeft: "5px" }}
          />
          <TextField
            rowsMin={5}
            placeholder="what's on your mind?"
            onChange={(e) => handleChange(e)}
            value={singleComm}
            fullWidth
            InputProps={{
              style: {
                color: "black", // Change the text color
                background: "rgba(255,255,255, 0.5)", // Change the background color
                borderRadius: "8px", // Add rounded corners
                padding: "8px", // Add some padding
                marginRight: "4px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{ height: 30 }}
            onClick={(e) => addComment(e)}
            sx={{ marginRight: "13px", marginTop: 2.5 }}
          >
            Post
          </Button>
        </Box>
        <Box>
      
          {cmt &&
            cmt.map((newcmt) => (
              <Box>
                <Box display={"flex"} flexDirection={"row"}>
                  <AccountCircleIcon
                    sx={{
                      fontSize: 40,
                      cursor: "pointer",
                      marginLeft: "5px",
                      color: getColorFromLetter(newcmt.name.charAt(0)),
                    }}
                  />
                  <Box display={"flex"} flexDirection={"column"}>
                    <Typography marginTop={0}>{newcmt.name}</Typography>
                    <Typography marginTop={0} variant="h8">
                      comments On :{truncateDescription(newcmt.date, 10)}
                    </Typography>
                  </Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={'flex-start'}>
                  <Card
                    className="card1"
                    sx={{
                      width: `${Math.min(45, Math.max(10,newcmt.comments.length * 0.8))}rem`, // Adjust the multiplier as needed
                      "@media (max-width: 600px)": {
                        width: `${Math.min(19, Math.max(7,newcmt.comments.length * 0.8))}rem`, // Adjust the multiplier as needed
                      },
                      mt: 1,
                      mb: 2,
                      marginLeft:6,
                      padding: 1,
                      boxShadow: "5px 5px 10px #ccc",
                      ":hover:": {
                        boxShadow: "10px 10px 20px #ccc",
                      },
    
                    }}
                  >
                      <Typography variant="h7">{newcmt.comments}</Typography>

                  </Card>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default FullBlog;

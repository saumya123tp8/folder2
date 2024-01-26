import React,{useState,useEffect} from 'react'
import {Box,AppBar,Button, Typography, Toolbar,Tab,Tabs,Menu, MenuItem, useMediaQuery,createTheme}from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast';
import './blogcard.css'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
const Header = () => {
  const theme = createTheme({
    breakpoints:{
      values: {
        sm: 320, // Small devices (landscape phones)
        md: 415, // Medium devices (tablets)
      },
    },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isLogin=useSelector(state=>state.isLogin)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log(isLogin);
  const [value,setValue]=useState()
  const handlelogout=(e)=>{
    try{
      {isLogin&&
        dispatch(authActions.logout());
        toast.success('logout successfully')
        alert('logout successfully')
        navigate('/login')
        localStorage.removeItem('isLogin');
      }
    }catch(error){
      console.log(error);
    }
   }

   const handleTabClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleTabClose = () => {
    setAnchorEl(null);
  };
   const isMobile = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  return (
    // <div>Header</div>
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h5'>
                Ooops Post
            </Typography>
            {
              isLogin && (
                <Box display={'flex'} marginLeft={"auto"} marginRight={"auto"}>
               <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
{isMobile ? (
        <>
          <Tab icon={<ArrowDropDownCircleIcon />}label="Features" onClick={handleTabClick} />
          <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleTabClose}>
            <MenuItem component={Link} to="/blogs" onClick={handleTabClose}>Blogs</MenuItem>
            <MenuItem component={Link} to="/my-blogs" onClick={handleTabClose}>My Blogs</MenuItem>
            <MenuItem component={Link} to="/fav-blogs" onClick={handleTabClose}>Favorite Blogs</MenuItem>
            <MenuItem component={Link} to="/create-blog" onClick={handleTabClose}>Create Blog</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Tab label="Blogs" component={Link} to="/blogs" />
          <Tab label="My Blogs" component={Link} to="/my-blogs" />
          <Tab label="Favorite Blogs" component={Link} to="/fav-blogs" />
          <Tab label="Create Blog" component={Link} to="/create-blog" />
        </>
      )}
                {/* </Box> */}
               </Tabs>
            </Box>
              )
            }
            <Box display={'flex'} marginLeft="auto">
               {
                !isLogin && (
                  <>
                  <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/login">Login</Button>
                  <Button sx={{margin:1,color:'white'}}LinkComponent={Link} to="/register">Register</Button>
                  </>
                )
               }
               {
                isLogin && (
                  <>
                <Button onClick={handlelogout} sx={{margin:1,color:'white'}}>Logout</Button>
                  </>
                )
               }
                {/* <Button sx={{margin:1,color:'white'}}>Login</Button> */}
            </Box>
        </Toolbar>

    </AppBar>
    </>
  )
}

export default Header
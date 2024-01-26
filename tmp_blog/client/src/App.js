
import Header from './components/Header';
import { Route,Routes } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import toast, { Toaster } from 'react-hot-toast';
import Fav from './pages/Fav';
import FullBlog from './pages/FullBlog';
function App() {
  return (
    <>
    <Header/>
    <Toaster />
    <Routes>
    {/* <h1>blog app</h1> */}
    <Route path='/' element={<Blogs/>}/>
    <Route path='/blogs' element={<Blogs/>}/>
    <Route path='/my-blogs' element={<UserBlogs/>}/>
    <Route path='/fav-blogs' element={<Fav/>}/>
    <Route path='/blog-details/:id' element={<BlogDetail/>}/>
    <Route path='/create-blog' element={<CreateBlog/>}/>
    <Route path='/full-blog/:id' element={<FullBlog/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;

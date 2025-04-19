import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LoginPage from './LoginPage'
import WelcomePage from "./Pages/Welcomepage/WelcomePage"
import { LoginProvider } from './Contexts/LoginContext/Login'
import CreateBlog from './Pages/createblog/CreateBlog'
import { BlogProvider } from './Contexts/BlogCreation'
import ReadBlog from './Pages/BLog/Blog'
import EditBlog from './Pages/createblog/CreateBlogcopy'
// import { UserAuthProvider } from './Contexts/UserContext'

function App() {

  return (
    <LoginProvider>
    <BlogProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="home" element={<WelcomePage/>}/>
      <Route path="Createblog" element={<CreateBlog/>}/>
      <Route path ="Read" element ={<ReadBlog/>}/>
      <Route path ="EditBlog" element={<EditBlog/>}/>
    </Routes>
   </BrowserRouter>
      </BlogProvider>
    </LoginProvider>
  
  //  <LoginPage/>
  
  )
}

export default App

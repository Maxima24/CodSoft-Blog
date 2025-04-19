import React  from 'react';
// import { useLogin } from '../../Contexts/LoginContext/Login';
import { useLogin } from '../../Contexts/LoginContext/Login';
import { Navigate,useNavigate } from 'react-router-dom';
import { useBlogCreate } from '../../Contexts/BlogCreation';
import Loader from '../Loader';
import { auth } from '../../firebase';
// useState







export default function WelcomePage() {
    // const {blogContent} = useBlogCreate()
    const {userData} = useLogin()
    const navigate=useNavigate()
    const {isFetchingBlog,setBlogContent, deleteBlog} = useBlogCreate()

    console.log(isFetchingBlog)
    // const [loaded,IsLoaded]= useState(false)
    // const loaded =
    console.log(auth)
   
     const user = auth?.currentUser?.displayName
    // const navigate = useNavigate();
    const { setSelectedBlog, blogContent,RemoveBlog,EditBlog } = useBlogCreate();

    const handleDelete = async (id)=>{
      await deleteBlog(id);
      setBlogContent(()=>blogContent.filter(blog=>blog.id!==id))
    }
    const handleEdit = async (blog)=>{
      setSelectedBlog(blog)
      navigate("/EditBlog")
     
    }
    // const handleReadMore = (blog,id) => {
    //   setSelectedBlog(blog) // store selected blog in context
    //   navigate(`/Read`); // navigate to ReadBlog page
    // };

   
  return (
    
   

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white font-sans">
      {/* Hero Section */}
      
      <header className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] ">
          NeoBlog ✨
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Dive into the next-gen blogging experience
        </p>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-10">
        {/* Blog Posts */}
       
        <div className="md:col-span-2 space-y-6">
          {   isFetchingBlog ? <Loader/> :  blogContent.map((blog,ids) => (
           
            <div
              key={ids}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-cyan-400/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-semibold text-cyan-300 hover:text-pink-400 transition-colors">
                {blog.title}
              </h2>
              <p className="mt-2 text-gray-400">{blog.content.split("").join("").slice(0,45)}.....</p>
              <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-pink-500 transition rounded-xl text-white font-medium shadow-lg hover:shadow-pink-500/50" onClick={()=>{
               setSelectedBlog(blogContent[ids])
               navigate("/Read")
              }}>
                Read More →
              </button>
              <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-pink-500 transition rounded-xl text-white font-medium shadow-lg hover:shadow-pink-500/50 ml-1.5" onClick={()=> handleEdit(blog)}>
                Edit Post
              </button>
              <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-pink-500 transition rounded-xl text-white font-medium shadow-lg hover:shadow-pink-500/50 ml-34" onClick={()=>{handleDelete(blogContent[ids].id)}}>
                Delete Post 
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-400/20">
          <h3 className="text-xl font-semibold text-purple-300 mb-4"> Welcome {user}</h3>
          <p className="text-gray-400 mb-4">
            NeoBlog is where futuristic design meets modern tech content.
          </p>
          <ul className="space-y-2 text-sm text-cyan-400">
            <li className="hover:underline hover:text-pink-500 cursor-pointer" onClick={()=>navigate("/Createblog")}>➕ Create Blog</li>
            <li className="hover:underline hover:text-pink-500 cursor-pointer"> 🖊️Edit Blog</li>
            <li className="hover:underline hover:text-pink-500 cursor-pointer">🛸 Contact</li>
          </ul>
        </aside>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-800 mt-10">
        © 2025 NeoBlog. Made by Steel Maxima and imagination.
      </footer>
    </div>
  );
}

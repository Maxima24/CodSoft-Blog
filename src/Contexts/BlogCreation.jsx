import { createContext, useContext } from "react";
import { useState,useEffect } from "react";
import { collection, addDoc, getDocs,updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useLogin } from "./LoginContext/Login";
// auth
// import { useNavigate } from "react-router-dom";
 // adjust path to your firebase.js file
// import { Navigate, NavLink, useNavigate } from "react-router-dom";

db

 const BlogCreate= createContext()


  export const   BlogProvider =({children}) =>{
    const [blogContent,setBlogContent] = useState([])
    const [isFetchingBlog ,setIsFetchingBlog] = useState(true)
    const [isLoading,setIsloading]= useState(true)
    const [blog] = useState([])
    const {userData} = useLogin()
    
    const [selectedBlog, setSelectedBlog] = useState(() => {
      // Load from localStorage on context init
     const saved = localStorage.getItem("selectedBlog");
      return saved ? JSON.parse(saved) : null;
    });    // const navigate = useNavigate()
    const blogArray = []
   
    useEffect(() => {
      if (selectedBlog) {
        localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
      }
    }, [selectedBlog]);
   

     const addBlog = async (newBlog) =>{
        setIsloading(true)
         const blogRef = collection(db, 'Blogs')
         await addDoc(blogRef,{... newBlog,username:auth.currentUser.displayName})
         const blogs = await getDocs(blogRef)
         blogs.forEach((blog) => {
            blogArray.push({ ...blog.data(), id: blog.id,username:blog.username })
          });
          setBlogContent(blogArray)
          setIsloading(false)
        //  setBlogContent((prev)=>[..rev,newBlog])
        }


        //////////////////////!SECTION
        useEffect(() => {
            const fetchBlogs = async () => {
              const blogRef = collection(db, 'Blogs');
              const blogs = await getDocs(blogRef);
          
             
              blogs.forEach((blog) => {
                blogArray.push({ ...blog.data(), id: blog.id });
              });
          
              setBlogContent(blogArray);
            };
          
            fetchBlogs().finally(()=> {
              setIsFetchingBlog(false) // 🔥 Called once on mount
            });
          }, []);
           const deleteBlog = async (blogId) => {
            try {
              await deleteDoc(doc(db, "Blogs", blogId));
              console.log(`Blog with ID ${blogId} deleted successfully`);
            } catch (error) {
              console.error("Error deleting blog:", error);
              alert("Something went wrong while deleting the blog.");
            }
           }
           const editBlog = async (updatedBlog) => {
            try {
              const blogRef = doc(db, "Blogs", updatedBlog.id); // Assuming 'id' is the Firebase doc ID
              await updateDoc(blogRef, {
                title: updatedBlog.title,
                content: updatedBlog.content,
                // username: 
              });
              setBlogContent((prevBlogs) =>
                prevBlogs.map((blog) =>
                  blog.id === updatedBlog.id ? updatedBlog : blog
                )
              );
            } catch (error) {
              console.error("Error updating blog:", error);
            }
          }
         
          
           
           
        // Save to localStorage whenever selectedBlog updates
     
    return(
        <BlogCreate.Provider value={{blogContent,setBlogContent,addBlog,isLoading,blogArray,selectedBlog,setSelectedBlog , isFetchingBlog,deleteBlog,editBlog,blog }}>
            {children}
        </BlogCreate.Provider>
    )

    }
    // eslint-disable-next-line react-refresh/only-export-components
    export const useBlogCreate = () => useContext(BlogCreate)
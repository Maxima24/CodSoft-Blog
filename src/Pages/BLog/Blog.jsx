// import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
import { useBlogCreate } from '../../Contexts/BlogCreation';
import { useLogin } from '../../Contexts/LoginContext/Login';
import { auth } from '../../firebase';

const ReadBlog = () => {
  const navigate = useNavigate();
  const { selectedBlog, blogContent } = useBlogCreate();
      const {userData}=useLogin()
  
      console.log(userData)
 
  

  // const [showBack, setShowBack] = useState(false);

  

  // If no blog is directly selected, fallback to the first or show message
  const blog = selectedBlog || blogContent?.[0];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl">Blog not found 😢</p>
      </div>
    );
  }
  
    

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 lg:px-40 pt-16 relative">
      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-white/20 transition-all duration-300 ease-in-out transform`}
      >
        <span>🔙</span>
        <span className="hidden sm:inline">Back</span>
      </button>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 border-b border-gray-700 pb-4">
          {blog.title}
        </h1>
        <div className="text-lg leading-relaxed tracking-wide text-gray-200 whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </div>
  );
};


export default ReadBlog

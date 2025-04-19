// src/Pages/CreateBlog.jsx
import React, { useState,useEffect } from "react";
// import {  } from "../../Contexts/BlogCreation";
import { useNavigate } from "react-router-dom";
import { useBlogCreate } from "../../Contexts/BlogCreation";
// import { useForm } from "react-hook-form";

// import {useForm}


const EditBlog = () => {
  const { selectedBlog, editBlog } = useBlogCreate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const {reset} = useForm()
  const navigate = useNavigate();
  

  //   const {setBlogContent}= useBlogCreate()
  const newPost = {title,content}
// const navigate = useNavigate()

useEffect(() => {
  if (selectedBlog) {
    setTitle(selectedBlog.title);
    setContent(selectedBlog.content);
  }
}, [selectedBlog]);

const handleSubmit = async (e) => {
  e.preventDefault();
  await editBlog({
    id: selectedBlog.id,
    title,
    content,
  });
  navigate("/home");
};


    // reset()
    // navigate("/home")

    console.log("New Blog:", newPost);

    // You can send the data to your backend or Firebase here
;
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] to-[#101935] text-white px-8 py-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">✨ Edit Your Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#1b223b] p-8 rounded-2xl shadow-lg border border-purple-700"
      >
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-cyan-300">Blog Title</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#0f152a] border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-cyan-300">Content</label>
          <textarea
            rows={10}
            className="w-full p-3 rounded-lg bg-[#0f152a] border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-800 transition-all duration-200 px-6 py-3 rounded-xl text-white font-bold text-lg w-full"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;

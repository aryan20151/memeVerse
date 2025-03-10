"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoOptions, IoHomeOutline } from "react-icons/io5";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';


const Page = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState('');

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    if (tokenCookie) {
      setToken(tokenCookie.split("=")[1]);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const res = await fetch("/api/users/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          toast.error('Something went Wrong!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      };
      fetchUser();
    }
  }, [token]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        setImageUrl(data.url);
      } else {
        toast.error('Upload Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Upload error occurred!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    const metaUpload = await axios.post('/api/upload/meta',{token,imageurl: imageUrl,caption});
    if(metaUpload.data.err){
      toast.error(metaUpload.data.err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    toast.success('Meme Posted Successfully !!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setFile(null);
    setPreview("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b to-[#450F28] from-[#151721] flex flex-col text-white">
      <div className="w-full h-[12vh] flex items-center justify-between px-6 md:px-10">
        <h1 className="text-white font-bold text-3xl md:text-4xl">memeVerse</h1>
        {userData && (
          <img className="w-10 h-10 rounded-full" src={userData.profilePic} alt="User Profile" />
        )}
      </div>
      <div className="w-full h-[78vh] items-center flex flex-col">
        {preview ? (
          <div className="mt-2 w-full h-[40vh]">
            <img src={preview} alt="Selected File" className="object-cover rounded-lg shadow-md" />
          </div>
        ) : (
          <div className="flex flex-col items-center mt-[10vh]">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="block w-full text-sm text-gray-300 
                file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 
                file:text-sm file:font-semibold 
                file:bg-blue-600 file:text-white 
                hover:file:bg-blue-700"
              onChange={handleFileChange}
            />
          </div>
        )}
          <div className="flex gap-4 mt-4">
            <input type="text" className="w-[90vw] border-2 border-gray-700 rounded-lg h-15 focus:outline-none px-5" placeholder="Type Your Caption here..." />
          </div>
        {preview && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-green-500 rounded-lg text-white font-semibold"
            >
              Upload
            </button>
            <button
              onClick={() => {
                setFile(null);
                setPreview("");
              }}
              className="px-6 py-2 bg-red-500 rounded-lg text-white font-semibold"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div className="h-[10vh] w-full bg-black/50 flex justify-evenly items-center">
        <a href="/" className="text-4xl text-gray-500">
          <IoHomeOutline />
        </a>
        <a href="/create" className="text-4xl">
          <FaRegSquarePlus />
        </a>
        <a href="/preferences" className="text-4xl text-gray-500">
          <IoOptions />
        </a>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default Page;

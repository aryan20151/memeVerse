"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [gloader, setgLoader] = useState(false);
  
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      router.push("/");
    }
  }, []);

  const handleRegister = async () => {
    try {
      setLoader(true);
      const response = await axios.post('/api/users/register', { name, email, password });
      if (response.data.msg) {
        document.cookie = `token=${response.data.token}; path=/; max-age=3600`;
        router.push('/');
      } else {
        console.log(response.data.err);
        toast.error(response.data.err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
      setLoader(false);
    } catch (error) {
      toast.error('Something went Wrong!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b to-[#450F28] from-[#151721] flex flex-col'>
      <div className='w-full h-[12vh] flex items-center px-6 md:px-10'>
        <h1 className='text-white font-bold text-3xl md:text-4xl'>memeVerse</h1>
      </div>
      <div className='flex flex-1 justify-center items-center px-4'>
        <div className='bg-[#2B2F44]/30 w-full max-w-[90%] sm:max-w-[400px] md:max-w-[30vw] h-auto md:h-[70vh] p-6 rounded-2xl flex flex-col items-center'>
          <h1 className='text-white text-2xl md:text-3xl font-bold'>Create New Account</h1>
          <h1 className='text-gray-300 mt-2 text-sm md:text-base'>
            Already have an account? <Link className='text-blue-500' href="/login">Login</Link>
          </h1>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Enter Your Name' 
            type="text" 
            className='w-full bg-white/10 h-12 md:h-[8vh] rounded-xl mt-8 text-white px-4 focus:outline-none font-semibold' 
          />
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter Your Email' 
            type="text" 
            className='w-full bg-white/10 h-12 md:h-[8vh] rounded-xl mt-3 text-white px-4 focus:outline-none font-semibold' 
          />
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Enter Your Password' 
            type="password" 
            className='w-full bg-white/10 h-12 md:h-[8vh] rounded-xl mt-3 text-white px-4 focus:outline-none font-semibold' 
          />
          {!loader && (
            <button 
              onClick={handleRegister} 
              className='w-full h-12 md:h-[8vh] mt-8 bg-gradient-to-l to-[#161721] from-[#6D1A41] rounded-xl font-bold text-lg md:text-xl text-white flex items-center justify-center hover:cursor-pointer'
            >
              Create Account
            </button>
          )}
          {loader && (
            <button 
              className='w-12 h-12 md:h-[8vh] mt-8 bg-gradient-to-l to-[#161721] from-[#6D1A41] rounded-full font-bold text-xl text-white flex items-center justify-center hover:cursor-pointer'
            >
              <MoonLoader size={30} color='white' />
            </button>
          )}
          <h1 className='text-white mt-5 text-sm md:text-base'>or continue with: </h1>
          {!gloader && <button 
            onClick={() => {setgLoader(true);signIn("google")}}
            className='hover:cursor-pointer text-2xl bg-[#161721] w-10 h-10 flex items-center justify-center mt-5 rounded-full' 
          >
            <FcGoogle />
          </button>}
          {gloader && <button 
            className='hover:cursor-pointer text-2xl bg-[#161721] w-10 h-10 flex items-center justify-center mt-5 rounded-full' 
          >
            <MoonLoader size={20} color='white'/>
          </button>
          }
        </div>
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
}

export default Page;
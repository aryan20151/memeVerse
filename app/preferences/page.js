import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

const page = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const handleUserFetch = async(token)=>{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/user`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    return await res.json();
  }
  if(!token){
    redirect('/login');
  }
  const userData = await handleUserFetch(token);
  return (
    <div className='w-full min-h-screen bg-gradient-to-b to-[#450F28] from-[#151721] flex flex-col text-white'>
      <div className='w-full h-[12vh] flex items-center justify-between px-6 md:px-10'>
        <h1 className='text-white font-bold text-3xl md:text-4xl'>memeVerse</h1>
      </div>
      <div className='w-full h-[78vh] pt-8'>
        <div className='w-full flex flex-col items-center'>
            <img className='w-[14vh] rounded-full' src={userData.profilePic} />
            <h1 className='font-bold mt-5'>{userData.name}</h1>
            <h1>{userData.email}</h1>
            <a href='/preferences/change_name' className='font-bold text-blue-500 mt-3'>Change Name</a>
        </div>
        <div className='w-full flex flex-col items-center mt-[10vh]'>
            <a href='/preferences/change_password'><button className='w-[30vh] h-[7vh] bg-amber-600 rounded-xl font-bold hover:cursor-pointer'>Change Password</button></a>
            <a href='/preferences/logout' className='font-bold text-red-500 mt-[15vh]'>Logout</a>
            <h2 className='text-gray-500 mt-5 font-bold'>version 1.0.0</h2>
        </div>
      </div>
      <div className='h-[10vh] w-full bg-black/50 flex justify-evenly items-center'>
        <a href='/' className='text-4xl text-gray-500'><IoHomeOutline /></a>
        <a href='/create' className='text-4xl text-gray-500'><FaRegSquarePlus /></a>
        <a href='/preferences' className='text-4xl'><IoOptions /></a>
      </div>
    </div>
  )
}

export default page

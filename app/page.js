import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoOptions, IoHomeOutline } from "react-icons/io5";
import MemeFeed from "@/components/MemeFeed";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const handleUserFetch = async (token) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return await res.json();
  };

  const userData = await handleUserFetch(token);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b to-[#450F28] from-[#151721] flex flex-col text-white">
      {/* Header */}
      <div className="w-full h-[12vh] flex items-center justify-between px-6 md:px-10">
        <h1 className="text-white font-bold text-3xl md:text-4xl">memeVerse</h1>
        <img className="w-10 h-10 rounded-full" src={userData.profilePic} />
      </div>

      {/* Meme Feed Section */}
      <div className="w-full flex-grow overflow-y-auto">
        <MemeFeed />
      </div>

      {/* Bottom Navigation */}
      <div className="h-[10vh] w-full bg-black/50 flex justify-evenly items-center">
        <a href="/" className="text-4xl">
          <IoHomeOutline />
        </a>
        <a href="/create" className="text-4xl text-gray-500">
          <FaRegSquarePlus />
        </a>
        <a href="/preferences" className="text-4xl text-gray-500">
          <IoOptions />
        </a>
      </div>
    </div>
  );
};

export default page;

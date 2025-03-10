"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const {token} = useParams();
  const router = useRouter();
  const handleLogin = async()=>{
    document.cookie = `token=${token}; path=/; max-age=3600`;
    router.push('/');
  }
  useEffect(() => {
    handleLogin();
  }, [])
  
  return (
    <div>
      {token}
    </div>
  )
}

export default page

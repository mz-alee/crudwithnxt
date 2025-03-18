"use client"
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Redux/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Navbar = ({handleTheme}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogout=()=>{
    dispatch(logout())
    setTimeout(() => {
      router.push('Login')
      
    }, 500);
  }
  
  return (
    <div className='flex justify-between px-6 py-3'>
      <h2 className=' text-xl font-bold italic '>Crud</h2>
      {/* <button onClick={()=>handleTheme()}>dark</button> */}
      <button className=' cursor-pointer bg-blue-400 rounded text-white px-2 ' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;

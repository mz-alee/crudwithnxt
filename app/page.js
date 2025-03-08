import React from 'react'
import Home from './components/Home'
import HookForm from './components/HookForm'
import Navbar from './components/Navbar'

const page = () => {
  return (
    <div>
      {/* <Home/> */}
      <Navbar/>
      <HookForm/>
    </div>
  )
}

export default page
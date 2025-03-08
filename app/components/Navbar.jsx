import React from 'react'
import crudlogo from './crudlogo.png'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <Image className='curd-logo' src={crudlogo} alt='curd logo'></Image>
      </div>
    </div>
  )
}

export default Navbar
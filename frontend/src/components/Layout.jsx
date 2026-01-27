import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Navbar />
        <div className='h-[calc(100vh)] pt-16 bg-gray-100'>
            <Outlet />
        </div>
    </>
  )
}

export default Layout
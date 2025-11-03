import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import DetailsProduct from './components/DetailsProduct/DetailsProduct'

function Layout() {
  return (
    <>
    <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
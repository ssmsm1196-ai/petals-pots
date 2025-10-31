import React from 'react'
import TopNav from './TopNav/TopNav'
import CenterNav from './CenterNav/CenterNav'
function Navbar() {
  return (
    <nav className='Navbar'>
      <TopNav/>
       <CenterNav/>  
    </nav>
  )
}

export default Navbar

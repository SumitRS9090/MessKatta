import React from 'react'
import Menu from './Menu'
import ClientNavbar from './ClientNavbar'

export default function AllMenu() {
  return (
    <div className='container-fluid background'>
        <ClientNavbar/>
        <Menu/>
    </div>
  )
}

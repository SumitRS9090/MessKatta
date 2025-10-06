import React from 'react'
import ClientNavbar from './ClientNavbar'
import MenuUpdate from './MenuUpdate'
import Menu from './Menu'

export default function UpdateMenu() {
  return (
    <div className='container-fluid background'>
        <ClientNavbar/>
        <MenuUpdate/>
    </div>
  )
}

import React from 'react'
import ClientNavbar from './ClientNavbar'
import UpdatePage from './UpdatePage'

export default function ClientHome() {
  return (
   <div className='container-fluid background'>
        <ClientNavbar/>
        <UpdatePage/>
   </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Button, Spinner } from '@chakra-ui/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoIosLogOut } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ClientNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [loader,setLoader] = useState(0);

    useEffect(()=>{
      setLoader(0);
    },[]);

    const logOut = ()=>{
        setLoader((prev)=>prev+1);
        navigate('/');
        setLoader(0);
    }

  return (
    <Navbar expand={false} className="mb-3 bg-light shadow-lg">
    <Container fluid>
    <Navbar.Brand>
          <img
            alt=""
            src="/logo1.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Mess Katta
        </Navbar.Brand>
      <Navbar.Toggle style={{color:'white',backgroundColor:'white'}} aria-controls='offcanvasNavbar-expand-false' />
      <Navbar.Offcanvas
        id='offcanvasNavbar-expand-false'
        aria-labelledby='offcanvasNavbarLabel-expand-false'
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id='offcanvasNavbarLabel-expand-false'>
            Mess Katta
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={Link} className={`${location.pathname==='/ownerhome'?'active':''}`} to="/ownerhome">Home</Nav.Link>
            <Nav.Link as={Link} className={`${location.pathname==='/updateMenu'?'active':''}`} to="/updateMenu">Update Menu</Nav.Link>
            <Nav.Link as={Link} className={`${location.pathname==='/allMenu'?'active':''}`} to='/allMenu'>All Menus</Nav.Link>
            <Button variant='outline' colorPalette={'orange'} rounded={5} onClick={logOut}>
               {
                loader>=1 ? <Spinner size={'sm'}/> : <IoIosLogOut/>
               } 
                LogOut
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  )
}

import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { IoIosLogOut } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { showToast } from './ToastComponent';
import { IoSearchOutline } from "react-icons/io5";

export default function UserNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logOut =()=>{
        localStorage.clear();
        showToast('Logout Successfully..!',"success");
        navigate('/');
    }
    
    return (
    <Navbar fixed='top' collapseOnSelect expand="lg" className="navbarClass bg-light shadow-lg">
    <Container fluid>
    <Navbar.Brand>
          <img
            alt="Navbar"
            src="/logo1.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Mess Katta
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/userhome" className={`${location.pathname==='/userhome' ? 'active':''} custom-nav-link d-flex align-items-center gap-2`}>
              <MdOutlineRestaurantMenu/>
              All Menus
          </Nav.Link>
          <NavDropdown className={`${location.pathname==='/userhome/veg' || location.pathname === '/userhome/nonveg' || location.pathname==='/userhome/vegan' ? 'active':''} custom-nav-link`}  title="Filter" id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/userhome/veg">Veg</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/userhome/nonveg">Non-Veg</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/userhome/vegan">Vegan</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/search" className={`${location.pathname==='/search'?'active':''} custom-nav-link d-flex align-items-center gap-2`}>
              <IoSearchOutline/>
              Search Menu
          </Nav.Link>

        </Nav>
        <div className='d-flex ms-auto gap-3 mt-2 align-items-center'>
          <h6 className='navbarClass'><span style={{color:'black',cursor:'none'}}>Welcome,</span> {localStorage.name}</h6>
          <Button variant='light' onClick={logOut}>
            <IoIosLogOut style={{color:'red',fontSize:'20px'}} data-tooltip-id="my-tooltip" data-tooltip-content="Logout"/>
            <Tooltip id="my-tooltip" />
          </Button>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

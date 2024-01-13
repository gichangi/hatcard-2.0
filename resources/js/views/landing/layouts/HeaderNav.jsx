import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import vspFaviconIcon from "../assets/images/vsp-favicon.png";
import { IsDesktop } from '../../utils/IsDesktop';

const HeaderNav = () => {
    const isDesktop = IsDesktop(990);
  return (
    <Navbar bg="light" expand="lg" className="navbar landing-nav navbar-light navbar-default navbar-fixed-top past-main justify-content-between">
      <div className="container" >
        <Navbar.Brand className='bg-transparent' href="#" style={{ fontWeight: 'bolder', fontSize: '28px', color: 'rgb(164, 34, 98)' }}>
          <img src={vspFaviconIcon} alt="CARD" />CARD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            {!isDesktop ? <Nav.Link href="/login" >Login</Nav.Link> : <Nav.Link href="/login" style={{ backgroundColor: '#00697F', color: '#fff', width: '100px', textAlign: 'center' }}>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default HeaderNav;

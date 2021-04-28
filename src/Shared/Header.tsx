import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import logo from '../logo.svg';

/**
 * Header Component
 * @returns 
 */
const Header: React.FC = () => {
    return <>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                React Js
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href={'/'}>Counter</Nav.Link>
                    <Nav.Link href={'/Employee'}>Employee</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
}

export default Header;
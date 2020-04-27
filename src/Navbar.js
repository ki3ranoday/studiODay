import React, { Component } from 'react'
import classnames from "classnames";
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class Bar extends Component {
    render() {
        return (
            <div>
                <Navbar bg='light' expand='md' sticky='top'>
                    <Navbar.Brand><Link to='/' className='navBrand'>STUDIODAY</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            {/* <Nav.Link><Link to='/' className='navLink'>HOME</Link></Nav.Link> */}
                            <Nav.Link><Link to='/shop' className='navLink'>SHOP</Link></Nav.Link>
                            <Nav.Link><Link to='/checkout' className='navLink'>CHECKOUT</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Bar;
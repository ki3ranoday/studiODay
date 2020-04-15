import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class Bar extends Component {
    render() {
        return (
            <div>
                <Navbar bg='light' expand='md' sticky='top'>
                    <Navbar.Brand href='/'>StudiO'Day</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <NavDropdown title='Shop' id='basic-nav-dropdown'>
                                <NavDropdown.Item href = '/shop'>All</NavDropdown.Item>
                                <NavDropdown.Item href = '/shop/pottery'>Pottery</NavDropdown.Item>
                                <NavDropdown.Item href = '/shop/paintings'>Paintings</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href='/cart'>Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Bar;
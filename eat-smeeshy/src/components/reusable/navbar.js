import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/images/logo.svg';

function TopNavBar() {
    return (
        <Navbar variant="dark" fixed="sticky">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Eat Smeeshy!
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search restaurants" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNavBar;
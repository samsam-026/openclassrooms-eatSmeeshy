import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/images/logo.svg';

class TopNavBar extends React.Component {
    handlePriceChange = (e) => {
        let { onPriceChange } = this.props;
        onPriceChange(parseInt(e.target.value));
    };

    handleRateChange = (e) => {
        let { onRateChange } = this.props;
        onRateChange(parseInt(e.target.value));
    };

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Eat Smeeshy!
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsiveNavbar" />
                <Navbar.Collapse id="responsiveNavbar" >
                    <Nav />
                    <Form inline className="ml-auto" >
                        <Navbar.Text className="mr-sm-2">Filter restaurants by</Navbar.Text>
                        <Form.Control ref={rateSelect => this.rateSelect} as="select" id="starRateVal" className="mr-sm-2" onChange={this.handleRateChange}>
                            <option value={0}>All ratings</option>
                            <option value={1}>+1 star</option>
                            <option value={2}>+2 stars</option>
                            <option value={3}>+3 stars</option>
                            <option value={4}>+4 stars</option>
                            <option value={5}>5 stars</option>
                        </Form.Control>
                        <Form.Control ref={priceSelect => this.priceSelect} as="select" id="priceRange" onChange={this.handlePriceChange} >
                            <option value={4}>$$$$</option>
                            <option value={3}>$$$</option>
                            <option value={2}>$$</option>
                            <option value={1}>$</option>
                        </Form.Control>
                        {/* <FormControl type="text" placeholder="Search restaurants" className="mr-sm-2" /> */}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNavBar;
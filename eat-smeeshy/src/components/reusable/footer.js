import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/images/logo.svg';

function Footer() {
    return (
        <Container className="footer" fluid>
            <Row>
                <Col md={4} sm={12} className="footer-logo">
                    <Image src={logo} fluid />
                    <h1 className="display-4">Eat Smeeshy!</h1>
                </Col>
                <Col md={4} sm={12}>
                </Col>
                <Col md={4} sm={12}>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h6 className="text-muted">Copyright Eat Smeeshy Co.</h6>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
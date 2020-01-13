import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <Container className="footer" fluid>
            <Row>
                <Col md={12}>
                    <h6 className="text-muted">Copyright © Eat Smeeshy Co.</h6>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MapContainer from './map';

class Home extends React.Component {

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={7} style={{ paddingLeft: 0 }}>
                        <MapContainer />
                    </Col>
                    <Col md={5}>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Home;
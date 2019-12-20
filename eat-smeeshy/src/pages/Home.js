import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MapContainer from '../components/map/Map';
import ListItem from '../components/list/ListItem';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allRest: [],
            userPos: {}
        };
    }

    componentDidMount() {
        this.setRestaurants();
        this.setUserLocation();
    }

    setRestaurants() {
        fetch("http://localhost:5000/restaurants/")
            .then(response => response.json())
            .then(restaurantList => {
                this.setState({ allRest: restaurantList });
            }).catch(error => console.error(error));
    }

    setUserLocation() {
        navigator.geolocation.getCurrentPosition(currPos => {
            this.setState({ userPos: { lat: currPos.coords.latitude, lng: currPos.coords.longitude } });
        }, (error) => {
            console.error(error);
        }, { timeout: 20000 });
    }

    displayList() {
        return this.state.allRest.map((rest, index) => {
            return (<ListItem restaurant={rest} key={index} />)
        })
    }

    render() {
        return (
            <Container style={{ paddingTop: 65 }} fluid>
                <Row>
                    <Col md={7} style={{ paddingLeft: 0 }}>
                        <MapContainer restaurants={this.state.allRest} userPos={this.state.userPos} />
                    </Col>
                    <Col md={5}>
                        <ul id="restaurantList" className="list-unstyled text-left">
                            {this.displayList()}
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Home;
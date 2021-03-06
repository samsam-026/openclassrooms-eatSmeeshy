import React from 'react';
import Container from 'react-bootstrap/Container';

import MapContainer from '../components/map/Map';
import ListItem from '../components/list/ListItem';

class Home extends React.Component {

    handleMapClick(newLocation) {
        this.props.onMapClick(newLocation);
    }

    handleMapMove(newLocation) {
        this.props.onMapMove(newLocation);
    }

    handleMapBoundChange(newBounds) {
        this.props.onMapBoundChange(newBounds);
    }

    displayList() {
        return this.props.allRest.map((rest, index) => {
            return (<ListItem restaurant={rest} key={index} onRestClick={this.props.onRestSelect} />)
        })
    }

    render() {
        return (
            <Container style={{ paddingTop: 65 }} fluid>
                <div className="tab-content row">
                    <div role="tabpanel" className="tab-pane active col-md-6 col-lg-7" style={{ paddingLeft: 0 }} id="mapTab">
                        <MapContainer restaurants={this.props.allRest} userPos={this.props.userPos} onMapClick={this.handleMapClick.bind(this)} onMapMove={this.handleMapMove.bind(this)} onMarkerClick={this.props.onRestSelect} onMapBoundChange={this.handleMapBoundChange.bind(this)} />
                    </div>
                    <div role="tabpanel" className="tab-pane col-md-6 col-lg-5" id="restTab">
                        <ul id="restaurantList" className="list-unstyled text-left">
                            {this.displayList()}
                        </ul>
                    </div>
                </div>

                <ul data-role="navbar" className="nav nav-tabs d-md-none" id="bottomTabs" role="tablist">
                    <li className="nav-item">
                        <a className="btn active" href="#mapTab" aria-controls="mapTab" data-toggle="tab">Map</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn" href="#restTab" aria-controls="restTab" data-toggle="tab">List</a>
                    </li>
                </ul>
            </Container>
        )
    }

}

export default Home;
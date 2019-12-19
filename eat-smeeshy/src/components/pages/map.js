import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {

    render() {

        return (
            <div style={{ height: '90vh', width: '100%' }}>
                <Map
                    google={this.props.google}
                    zoom={8}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {

    displayMarkers = () => {
        return this.props.restaurants.map((rest, index) => {
            return <Marker
                key={index} id={index} position={rest.geometry.location}
                name={rest.name}
                title={rest.name}
                icon={require("../../assets/images/marker-sm.png")}
                style={{ width: 40, height: 40 }}
            />
        });
    }

    render() {
        return (
            <div style={{ height: '90vh', width: '100%', textAlign: "center" }}>
                {this.props.userPos ? <Map
                    google={this.props.google}
                    zoom={13}
                    initialCenter={this.props.userPos}
                >

                    <Marker position={this.props.userPos}
                        name="Your location"
                        title="Your location"
                        icon={require("../../assets/images/user-map-marker.png")}
                        style={{ width: 40, height: 40 }}
                    />

                    {this.displayMarkers()}

                </Map> :
                    <h1 className="display-2" style={{ margin: "auto" }}>Loading...</h1>
                }

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);
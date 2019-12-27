import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import env from '../../env';

class MapContainer extends React.Component {

    displayMarkers = () => {
        return this.props.restaurants.map((rest, index) => {
            return <Marker
                key={index} id={index} position={rest.geometry.location}
                name={rest.name}
                title={rest.name}
                icon={require("../../assets/images/marker-sm.png")}
                style={{ width: 40, height: 40 }}
                onClick={()=> this.handleMarkerClick(rest.place_id)}
            />
        });
    }

    mapClicked(clickEvent) {
        let lat = clickEvent.latLng.lat();
        let lng = clickEvent.latLng.lng();
        this.props.onMapClick({ lat, lng });
    }

    centerMoved(map) {
        let lat = map.center.lat();
        let lng = map.center.lng();
        this.props.onMapMove({ lat, lng });
    }

    handleMarkerClick = (place_id) => {
        this.props.onMarkerClick(place_id);
    }

    render() {
        return (
            <div style={{ height: '90vh', width: '100%', textAlign: "center" }}>
                {this.props.userPos ? <Map
                    google={this.props.google}
                    onClick={(mapProps, map, clickEvent) => this.mapClicked(clickEvent)}
                    onDragend={(mapProps, map) => this.centerMoved(map)}
                    zoom={15}
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
    apiKey: env.googleApi
})(MapContainer);
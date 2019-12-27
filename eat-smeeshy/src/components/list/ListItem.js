import React from 'react';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import env from '../../env';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListItem extends React.Component {

    displayPrice(price) {
        return [...Array(price)].map((pri, i) => <FontAwesomeIcon key={i} icon={['fas', 'dollar-sign']} size="lg" />);
    }

    displayRating(selectedStars) {
        return [...Array(5)].map((el, i) =>
            // check if current star should be half
            i < selectedStars && i + 1 > selectedStars ?
                <FontAwesomeIcon key={i} icon={['fas', 'star-half-alt']} size="lg" />
                // not half, so check if current star should be full
                : i < selectedStars ? <FontAwesomeIcon key={i} icon={['fas', 'star']} size="lg" />
                    // else, current star should be empty
                    : <FontAwesomeIcon key={i} icon={['far', 'star']} size="lg" />
        );
    }

    handleClick = () => {
        this.props.onRestClick(this.props.restaurant.place_id);
    }

    render() {
        let { name, formatted_address, price_level, rating, photos } = this.props.restaurant;
        let imageURL = photos && photos[0].photo_reference ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photos[0].photo_reference + "&key=" + env.googleApi : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80";
        return (
            <Media as="li" className="rest-list-item clickable" onClick={this.handleClick} >
                <div className="img-div" style={{ backgroundImage: `url(${imageURL})` }} />
                <Media.Body>
                    <h5>{name}</h5>
                    <p className="text-muted">{formatted_address ? formatted_address : "Sri Lanka"}</p>
                    <Row className="rate-price">
                        <Col xs={8} sm={6} md={6} className="rating">
                            {rating && rating > 0 && rating <= 5 ? this.displayRating(rating) : this.displayRating(1)}
                        </Col>
                        <Col xs={4} sm={6} md={6} className="price text-right">
                            {price_level && price_level > 0 && price_level <= 4 ? this.displayPrice(price_level) : this.displayPrice(2)}
                        </Col>
                    </Row>
                </Media.Body>
            </Media>
        )
    }
}

export default ListItem;
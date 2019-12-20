import React from 'react';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    render() {
        let { name, address, image, price_level, rating } = this.props.restaurant;
        return (
            <Media as="li" className="rest-list-item">
                <div className="img-div" style={{ backgroundImage: `url(${image})` }} />
                <Media.Body>
                    <h5>{name}</h5>
                    <p className="text-muted">{address}</p>
                    <Row className="rate-price">
                        <Col xs={6} sm={6} md={6} className="rating">
                            {this.displayRating(rating)}
                        </Col>
                        <Col xs={6} sm={6} md={6} className="price text-right">
                            {this.displayPrice(price_level)}
                        </Col>
                    </Row>
                </Media.Body>
            </Media>
        )
    }
}

export default ListItem;
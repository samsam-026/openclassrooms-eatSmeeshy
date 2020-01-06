import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from 'react-bootstrap/Container';

class ReviewItem extends React.Component {

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
        let { author_name, text, rating } = this.props.review;
        return (
            <Container className="review-list-item">
                <Row>
                    <Col xs={6}>
                        <h5>
                            {author_name}
                        </h5>
                    </Col>
                    <Col xs={6} className="text-right">
                        <h6 className="reviewRating">
                            {this.displayRating(rating)}
                        </h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{text}</p>
                    </Col>
                </Row>
                <hr />
            </Container>
        )
    }
}

export default ReviewItem;
import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewItem from '../list/ReviewItem';

class Restaurant extends React.Component {

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

    displayList() {
        return this.props.expandedRest.reviews.map((review, index) => {
            return (<ReviewItem review={review} key={index} />)
        })
    }

    handleClear = () => {
        this.props.onSelectClear();
    }

    render() {
        let activeClass = this.props.expandedRest && this.props.expandedRest.name ? "active" : "";
        let { name, address, price_level, rating } = this.props.expandedRest;
        return (
            <>
                <Container id="restDetails" className={"text-left " + activeClass}>
                    <Row style={{ marginBottom: "1.5em" }}>
                        <Col xs={8} md={10}>
                            <h1>{name}</h1>
                            <p className="text-muted">{address}</p>
                            <Row>
                                <Col xs={6} id="ratingDiv">
                                    <h4 className="rating">{this.displayRating(rating)}</h4>
                                </Col>
                                <Col xs={6} id="priceDiv" className="text-right">
                                    <h4 className="price">{this.displayPrice(price_level)}</h4>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4} md={2} className="text-right">
                            <FontAwesomeIcon onClick={this.handleClear} size={"4x"} icon={["fas", "angle-left"]} color="#9C0D38" className="d-none d-md-inline-block clickable" />
                            <FontAwesomeIcon onClick={this.handleClear} size={"3x"} icon={["fas", "angle-right"]} color="#9C0D38" className="d-inline-block d-md-none clickable" />
                            <Button variant="outline-primary">Write Review</Button>
                        </Col>
                    </Row>
                    <div id="restScrollDetails">
                        {/* <Row id="imageRow"></Row> */}
                        <Row id="reviewRow">
                            <Col>
                                {this.props.expandedRest && this.props.expandedRest.reviews ?
                                    <ul id="reviewList" className="list-unstyled text-left">
                                        {this.displayList()}
                                    </ul> :
                                    <h1 className="text-center text-muted">No Reviews</h1>}
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className={"overlay " + activeClass} />
            </>
        )
    }
}

export default Restaurant;
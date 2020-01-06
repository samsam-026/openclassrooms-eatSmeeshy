import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import StarRating from './StarRating';

class ReviewModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stars: 1
        }
    }

    changeRating(stars) {
        this.setState({ stars });
    }

    handleClose = () => {
        this.props.onReviewClose();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        let form = e.currentTarget;

        let reviewerName = form.elements.reviewerName.value;
        let comments = form.elements.comments.value;

        this.props.onReviewSubmit(this.props.restaurant.geometry.location, reviewerName, comments, this.state.stars);

        this.setState({ stars: 1 }, () => this.handleClose())

    }

    render() {
        return (
            <Modal size="lg" show={this.props.show} onHide={this.handleClose} id="reviewModal" animation centered>
                <Modal.Header closeButton>
                    <Modal.Title>Write a review for {this.props.restaurant.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="reviewerName">
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="John" required autoFocus={true} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Rating</Form.Label>
                            <Col sm={10}>
                                <StarRating rating={this.state.stars} onRateChange={this.changeRating.bind(this)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="comments">
                            <Form.Label column sm={2}>Comments</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" rows="3" required />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Add review</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default ReviewModal;
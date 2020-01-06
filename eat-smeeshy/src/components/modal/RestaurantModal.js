import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class RestaurantModal extends React.Component {

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
        this.props.onRestClose();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        let form = e.currentTarget;

        let restName = form.elements.restName.value;
        let priceRange = form.elements.priceRange.value;

        this.props.onRestSubmit(restName, parseInt(priceRange));
        this.handleClose();
    }

    render() {
        return (
            <Modal size="lg" show={this.props.show} onHide={this.handleClose} id="restaurantModal" animation centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new restaurant</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="restName">
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" autoFocus required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="priceRange">
                            <Form.Label column sm={2}>Price</Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select">
                                    <option value={1}>$</option>
                                    <option value={2}>$$</option>
                                    <option value={3}>$$$</option>
                                    <option value={4}>$$$$</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Add restaurant</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default RestaurantModal;
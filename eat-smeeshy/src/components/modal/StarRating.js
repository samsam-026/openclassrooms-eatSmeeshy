import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class StarRating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: props.rating
        }
    }

    handleStarClick(rating) {
        this.setState({ rating });
        this.props.onRateChange(rating);
    }

    displayRating(selectedStars) {
        return [...Array(5)].map((el, i) =>
            // check if current star should be full
            i < selectedStars ? <FontAwesomeIcon key={i} icon={['fas', 'star']} size="2x" className="clickable" onClick={() => this.handleStarClick(i + 1)} />
                // else, current star should be empty
                : <FontAwesomeIcon key={i} icon={['far', 'star']} size="2x" className="clickable" onClick={() => this.handleStarClick(i + 1)} />
        );
    }

    render() {
        return (
            <div className="star-rating">
                {this.displayRating(this.state.rating)}
            </div>
        )
    }
}

export default StarRating;
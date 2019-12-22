import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/reusable/Navbar';
import Footer from './components/reusable/Footer';
import Home from './pages/Home';
import Restaurant from './components/restaurant/Restaurant';
import ReviewModal from './components/modal/ReviewModal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allRest: [],
      filteredRest: [],
      userPos: {},
      expandedRest: {
        review: []
      },
      rateFilterValue: 0,
      priceFilterValue: 4,
      showReviewModal: false
    };
  }

  componentDidMount() {
    this.setRestaurants();
    this.setUserLocation();
  }

  setRestaurants() {
    fetch("http://localhost:5000/restaurants/")
      .then(response => response.json())
      .then(restaurantList => {
        this.setState({ allRest: restaurantList, filteredRest: restaurantList });
      }).catch(error => console.error(error));
  }

  setUserLocation() {
    navigator.geolocation.getCurrentPosition(currPos => {
      this.setState({ userPos: { lat: currPos.coords.latitude, lng: currPos.coords.longitude } });
    }, (error) => {
      console.error(error);
    }, { timeout: 20000 });
  }

  changePrice(priceVal) {
    this.setState({ priceFilterValue: priceVal }, () => this.filterRestaurants(this.state.priceFilterValue, this.state.rateFilterValue));
  }

  changeRate(rateVal) {
    this.setState({ rateFilterValue: rateVal }, () => this.filterRestaurants(this.state.priceFilterValue, this.state.rateFilterValue));
  }

  filterRestaurants(priceVal, rateVal) {
    let filteredList = this.state.allRest.filter(rest => rest.price_level <= priceVal && rest.rating >= rateVal);
    this.setState({ filteredRest: filteredList });
  }

  selectRestaurant(place_id) {
    let expandedRest = this.state.allRest.find(rest => rest.place_id === place_id);
    this.setState({ expandedRest })
  }

  clearRestSelection() {
    this.setState({ expandedRest: { reviews: [] } });
  }

  showReviewModal() {
    this.setState({ showReviewModal: true });
  }

  hideReviewModal() {
    this.setState({ showReviewModal: false });
  }

  addReview(placeId, name, comment, stars) {
    let { allRest } = this.state;

    let placeIndex = allRest.findIndex(rest => rest.place_id === placeId);

    if (placeIndex > -1) {
      allRest[placeIndex].reviews.push({ stars, name, comment });
      this.setState({ allRest, expandedRest: allRest[placeIndex] });
    }
  }

  render() {
    return (
      <div className="App">
        <Restaurant expandedRest={this.state.expandedRest} onSelectClear={this.clearRestSelection.bind(this)} onAddReview={this.showReviewModal.bind(this)} />
        <TopNavBar onPriceChange={this.changePrice.bind(this)} onRateChange={this.changeRate.bind(this)} />
        <Home userPos={this.state.userPos} allRest={this.state.filteredRest} onRestSelect={this.selectRestaurant.bind(this)} />
        <ReviewModal show={this.state.showReviewModal} onReviewClose={this.hideReviewModal.bind(this)} onReviewSubmit={this.addReview.bind(this)} restaurant={this.state.expandedRest} />
        <Footer />
      </div>
    );
  }
}

export default App;

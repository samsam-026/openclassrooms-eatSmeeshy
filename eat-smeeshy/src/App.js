import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/reusable/Navbar';
import Footer from './components/reusable/Footer';
import Home from './pages/Home';
import Restaurant from './components/restaurant/Restaurant';
import ReviewModal from './components/modal/ReviewModal';
import RestaurantModal from './components/modal/RestaurantModal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allRest: [],
      filteredRest: [],
      userPos: {},
      expandedRest: {
        review: [],
        geometry: {
          location: {}
        }
      },
      newRestLocation: {},
      rateFilterValue: 0,
      priceFilterValue: 4,
      showReviewModal: false,
      showRestModal: false
    };
  }

  componentDidMount() {
    this.setUserLocation();
  }

  setRestaurants({ lat, lng }) {
    fetch("http://localhost:5000/restaurants/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lat, lng })
    })
      .then(response => response.json())
      .then(restaurantList => {
        this.setState({ allRest: restaurantList, filteredRest: restaurantList });
      }).catch(error => console.error(error));
  }

  setUserLocation() {
    navigator.geolocation.getCurrentPosition(currPos => {
      this.setState({ userPos: { lat: currPos.coords.latitude, lng: currPos.coords.longitude } }, () => this.setRestaurants(this.state.userPos));
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
    this.setState({ expandedRest });
  }

  clearRestSelection() {
    this.setState({
      expandedRest: {
        reviews: [],
        geometry: {
          location: {}
        }
      }
    });
  }

  clickMap(newRestLocation) {

    let { allRest } = this.state;
    let restIndex = allRest.findIndex(rest => rest.geometry.location.lat === newRestLocation.lat && rest.geometry.location.lng === newRestLocation.lng);
    if (restIndex === -1) {
      this.setState({ newRestLocation }, () => this.showRestModal());
    } else {
      alert("A restaurant already exists in this place");
    }
  }

  moveMap(userPos) {
    this.setState({ userPos }, () => this.setRestaurants(userPos))
  }

  showReviewModal() {
    this.setState({ showReviewModal: true });
  }

  hideReviewModal() {
    this.setState({ showReviewModal: false });
  }

  showRestModal() {
    this.setState({ showRestModal: true });
  }

  hideRestModal() {
    this.setState({ showRestModal: false, newRestLocation: {} });
  }

  addReview(location, name, comment, stars) {
    let { allRest } = this.state;

    let placeIndex = allRest.findIndex(rest => rest.geometry.location.lat === location.lat && rest.geometry.location.lng === location.lng);

    if (placeIndex > -1) {
      allRest[placeIndex].reviews.push({ stars, name, comment });
      this.setState({ allRest, expandedRest: allRest[placeIndex] });
    }
  }

  addRestaurant(name, formatted_address, price_level) {
    let { allRest, newRestLocation } = this.state;

    let newRestaurant = { name, formatted_address, price_level, rating: 1, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", geometry: { location: { ...newRestLocation } }, reviews: [] }
    allRest.push(newRestaurant);
    this.setState({ allRest, expandedRest: newRestaurant });
  }

  render() {
    return (
      <div className="App">
        <Restaurant expandedRest={this.state.expandedRest} onSelectClear={this.clearRestSelection.bind(this)} onAddReview={this.showReviewModal.bind(this)} />
        <TopNavBar onPriceChange={this.changePrice.bind(this)} onRateChange={this.changeRate.bind(this)} />
        <Home userPos={this.state.userPos} allRest={this.state.filteredRest} onRestSelect={this.selectRestaurant.bind(this)} onMapClick={this.clickMap.bind(this)} onMapMove={this.moveMap.bind(this)} />
        <ReviewModal show={this.state.showReviewModal} onReviewClose={this.hideReviewModal.bind(this)} onReviewSubmit={this.addReview.bind(this)} restaurant={this.state.expandedRest} />
        <RestaurantModal show={this.state.showRestModal} onRestClose={this.hideRestModal.bind(this)} onRestSubmit={this.addRestaurant.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default App;

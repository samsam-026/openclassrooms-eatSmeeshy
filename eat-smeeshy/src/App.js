import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/reusable/Navbar';
import Footer from './components/reusable/Footer';
import Home from './pages/Home';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allRest: [],
      filteredRest: [],
      userPos: {},
      rateFilterValue: 0,
      priceFilterValue: 4
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
    console.log("priceVal", priceVal);
    this.setState({ priceFilterValue: priceVal }, () => this.filterRestaurants(this.state.priceFilterValue, this.state.rateFilterValue));
  }

  changeRate(rateVal) {
    console.log("rateVal", rateVal);
    this.setState({ rateFilterValue: rateVal }, () => this.filterRestaurants(this.state.priceFilterValue, this.state.rateFilterValue));
  }

  filterRestaurants(priceVal, rateVal) {

    let filteredList = this.state.allRest.filter(rest => rest.price_level <= priceVal && rest.rating >= rateVal);
    this.setState({ filteredRest: filteredList });
  }

  render() {
    return (
      <div className="App">
        <TopNavBar onPriceChange={this.changePrice.bind(this)} onRateChange={this.changeRate.bind(this)} />
        <Home userPos={this.state.userPos} allRest={this.state.filteredRest} />
        <Footer />
      </div>
    );
  }
}

export default App;

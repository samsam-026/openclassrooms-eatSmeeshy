import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import TopNavBar from './components/reusable/navbar';
import Footer from './components/reusable/footer';
import Home from './components/pages/home';

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;

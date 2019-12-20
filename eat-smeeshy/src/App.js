import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/reusable/Navbar';
import Footer from './components/reusable/Footer';
import Home from './pages/Home';

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

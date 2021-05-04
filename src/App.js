import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './shared/components/header-footer/NavBar';
import Routes from './routes/Routes';
import Footer from './shared/components/header-footer/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
				<NavBar/>
        <Routes/>				
				<Footer/>
			</BrowserRouter>
    );
  }
}

export default App
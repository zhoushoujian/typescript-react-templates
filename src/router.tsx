import React, { Component, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./views/index'));

class Routers extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route element={<Home />} path='/' />
        </Routes>
      </Router>
    );
  }
}

export default Routers;

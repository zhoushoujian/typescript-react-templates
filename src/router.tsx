import React, { Component, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Test = lazy(() => import('./views/index'));

class Routers extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route element={<Test />} path='/' />
        </Routes>
      </Router>
    );
  }
}

export default Routers;

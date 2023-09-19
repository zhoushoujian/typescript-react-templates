import React, { lazy, Suspense } from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Spin } from 'antd';

const Home = lazy(() => import('./views/index'));

const Routers = () => {
  return (
    <HashRouter basename='/'>
      <Suspense fallback={<Spin />}>
        <Switch>
          <Route path='/' render={() => <Home />} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
};

export default Routers;

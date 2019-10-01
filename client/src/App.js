import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppAppBar from './modules/views/AppAppBar';

import Login from './modules/views/Login';
import Register from './modules/views/Register';
// import ProductSmokingHero from './modules/views/ProductSmokingHero';

import withRoot from './modules/withRoot';
import ProductHero from './modules/views/ProductHero';


//redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <AppAppBar />
        <Route exact path='/'component={ProductHero}/>
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)

export default withRoot(App);

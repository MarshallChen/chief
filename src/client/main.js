import configureStore from '../shares/configureStore';
import { createHistory, useQueries } from 'history';
import createEngine from 'redux-storage/engines/localStorage';
import createRoutes from './createRoutes';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';

// TODO: Add app storage example.
// import storage from 'redux-storage';

if (process.env.IS_BROWSER) require('regenerator/runtime');

const app = document.getElementById('app');
const engine = createEngine('universal');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({engine, initialState});
const routes = createRoutes(store.getState);
const history = useQueries(createHistory)();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={history}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  app,
  () => {
    // This is where state from local storage should be retrieved.
    // storage.createLoader(engine)(store);
  }
);
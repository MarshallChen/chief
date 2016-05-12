import configureStore from '../shares/configureStore';
import { createHistory, useQueries } from 'history';
import createEngine from 'redux-storage/engines/localStorage';
import createRoutes from './createRoutes';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';

const app = document.getElementById('app');
const engine = createEngine('universal');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({engine, initialState});
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider defaultLocale="zh">
      <Router history={browserHistory}>
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

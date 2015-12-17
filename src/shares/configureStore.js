import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import fetch from './fetch';
import injectDependencies from './lib/injectDependencies';
import promiseMiddleware from 'redux-promise-middleware';
import validate from './validate';
import { applyMiddleware, createStore } from 'redux';
import { debug } from '../server/config';

export default function configureStore({ engine, initialState }) {

  const dependenciesMiddleware = injectDependencies({ fetch }, { validate });
  const middleware = [
    dependenciesMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  const loggerEnabled = debug || process.env.IS_BROWSER;

  if (loggerEnabled) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    middleware.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware);
  const store = createStoreWithMiddleware(createStore)(appReducer, initialState);

  if (module.hot) {
    module.hot.accept('./app/reducer', () => {
      const nextAppReducer = require('./app/reducer');
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
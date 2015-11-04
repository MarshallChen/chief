import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './app/app.react';
import Home from './home/Page.react';
import NotFound from './notfound/Page.react';

export default function createRoutes(getState) {

  function requireAuth(nextState, replaceState) {
    const loggedInUser = getState().user.user;
    if (!loggedInUser) {
      replaceState({ nextPathname: nextState.location.pathname }, '/');
    }
  }

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={NotFound} path="*" />
    </Route>
  )

}

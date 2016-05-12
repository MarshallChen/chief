import config from '../config';
import configureStore from '../../shares/configureStore';
import createRoutes from '../../client/createRoutes';
import DocumentTitle from 'react-document-title';
import Html from './html.react';
import Promise from 'bluebird';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import stateMerger from '../lib/merger';
import useragent from 'useragent';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { RouterContext, createMemoryHistory, match } from 'react-router';

const { webpack: { hotReloadPort }} = config;

export default function render(req, res, next) {
  const initialState = {
    device: {
      isMobile: ['phone', 'tablet'].indexOf(req.device.type) > -1
    },
    user: req.user
  };
  const store = configureStore({ initialState });
  const routes = createRoutes(() => store.getState());
  const location = createMemoryHistory().createLocation(req.url);

  match({ routes, location }, async (error, redirectLocation, renderProps) => {

    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (error) {
      next(error);
      return;
    }

    try {
      await fetchComponentDataAsync(store.dispatch, req, renderProps);
      const html = await renderPageAsync(store, renderProps, req);
      res.send(html);
    } catch (e) {
      next(e);
    }
  });
}

async function fetchComponentDataAsync(dispatch, req, { components, location, params }) {
  const { cookies: { sid }} = req;
  const fetchActions = components.reduce((actions, component) => {
    return actions.concat(component.fetchActions || []);
  }, []);
  const promises = fetchActions.map(action => {
    return dispatch(action({ location, params, sid }));
  });

  const results = await Promise.all(promises);

  results.forEach(result => {
    if (result.error)
      throw result.payload;
  });
}

async function renderPageAsync(store, renderProps, req) {

  const clientState = store.getState();
  const { headers, hostname } = req;
  const appHtml = getAppHtml(store, renderProps);
  const scriptHtml = getScriptHtml(clientState, headers, hostname);
  const title = DocumentTitle.peek();

  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <Html
      bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
      title={title}
    />
  );

}

function getAppHtml(store, renderProps) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <IntlProvider>
        <RouterContext {...renderProps} />
      </IntlProvider>
    </Provider>
  );
}

function getScriptHtml(clientState, headers, hostname) {
  let scriptHtml = '';
  const ua = useragent.is(headers['user-agent']);
  const ua2 = useragent.parse(headers['user-agent']);
  const isWechat = /micromessenger/.test(headers['user-agent'].toLowerCase());
  const needIntlPolyfill = ua.safari || (ua.ie && parseInt(ua.version, 10) < 11) || ua2.family == 'Sogou Explorer' || isWechat;
  const needShim = ua.ie && parseInt(ua.version, 10) <= 9

  const appScriptSrc = config.webpack.hotReload
    ? `${config.webpack.hotReloadPath}/build/app.${config.githash}.js`
    : `/_assets/app.${config.githash}.js`;

  scriptHtml += `
    <script>
      window.__INITIAL_STATE__ = ${serialize(clientState)};
    </script>
    <script src="${appScriptSrc}"></script>`;

  if (needIntlPolyfill) {
    scriptHtml += `
      <script src="https://nsb-static.b0.upaiyun.com/assets/intl/intl.min.js"></script>
      <script src="https://nsb-static.b0.upaiyun.com/assets/intl/locale-data/jsonp/${config.defaultLocale}.js"></script>`;
  }

  if (needShim) {
    scriptHtml += `<script src="/_assets/shim.${config.githash}.js"></script>`;
  }

  if (config.googleAnalyticsId)
    scriptHtml += `
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${config.googleAnalyticsId}');ga('send','pageview');
      </script>`;

  if (config.sentryKey)
    scriptHtml += `
    <script src="https://nsb-static.b0.upaiyun.com/assets/raven/raven.min.js"></script>
    <script>Raven.config('${config.sentryKey}').install()</script>
    `;

  return scriptHtml;

}


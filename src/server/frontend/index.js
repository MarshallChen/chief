import favicon from 'serve-favicon';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from '../config';
import cookieParser from 'cookie-parser';
import device from 'express-device';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import render from './render';
import schema from '../lib/schema';
import universal from '../lib/universal';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(universal());
app.use(compression());
app.use('/_assets', express.static('build', { maxAge: '200d' }));
app.use('/assets', express.static('assets', {maxAge: '200d' }));
app.use(favicon('assets/img/favicon.ico'));

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

// Load state extras for current user.
app.use(device.capture());

app.get('*', render);

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;

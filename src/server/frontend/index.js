import favicon from 'serve-favicon';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import render from './render';
import device from 'express-device';
import cookieParser from 'cookie-parser';
import universal from '../lib/universal';
import config from '../config';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(universal());
app.use(compression());
app.use('/_assets', express.static('build', { maxAge: '200d' }));
app.use('/assets', express.static('assets', {maxAge: '200d' }));
app.use(favicon('assets/img/favicon.ico'));

// Load state extras for current user.
app.use(device.capture());

app.get('*', render);

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;

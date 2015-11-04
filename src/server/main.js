import config from './config';
import errorHandler from './lib/errorhandler';
import express from 'express';
import frontend from './frontend';

const app = express();

app.use(frontend);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('App server started at port %s', config.port);
});

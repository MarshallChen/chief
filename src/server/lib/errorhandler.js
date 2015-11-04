import config from '../config';

// Four arguments need to be defined in order for the middleware to act
// as an error handler.
export default (err, req, res, next) => {
  const errorDetails = err.stack || err;

  console.error('Oops', errorDetails);

  res.status(500).format({
    json() {
      const errorInfo = {error: err.toString()};
      if (config.debug) errorInfo.details = errorDetails;

      res.send(errorInfo);
    },

    html() {
      const message = config.debug
        ? `<pre>${errorDetails}</pre>`
        : '<p>未知错误</p>';

      res.send(`<h1>500 Internal Server Error</h1>\n${message}`);
    },

    default() {
      const message = config.debug
        ? `${errorDetails}`
        : '未知错误';

      res.send(`${err.status} Internal Server Error:\n${message}`);
    }
  });
};

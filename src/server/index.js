const config = require('./config');

if (global.Intl) {
  require('intl');
  global.Intl.NumberFormat = global.IntlPolyfill.NumberFormat;
  global.Intl.DateTimeFormat = global.IntlPolyfill.DateTimeFormat;
} else {
  global.Intl = require('intl');
}

require('babel-register');

config.webpack.stylesExtensions.forEach(function(ext) {
  require.extensions['.' + ext] = function() {};
});

require('./main');

import autoprefixer from 'autoprefixer';
import config from '../src/server/config';
import constants from './constants';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import themeVars from '../src/client/app/theme.js';

const loaders = {
  'css': '',
  'less': `!less-loader?${JSON.stringify(themeVars)}`,
  'scss': '!sass-loader',
  'sass': '!sass-loader?indentedSyntax',
  'styl': '!stylus-loader'
};


export default function makeConfig() {

  function stylesLoaders() {
    return Object.keys(loaders).map(ext => {
      const prefix = 'css-loader!postcss-loader';
      const extLoaders = prefix + loaders[ext];
      const loader = config.webpack.hotReload
        ? `style-loader!${extLoaders}`
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader: loader,
        test: new RegExp(`\\.(${ext})$`)
      };
    });
  }

  const conf = {
    hotPort: config.webpack.hotReloadPort,
    cache: config.webpack.cache,
    debug: config.webpack.debug,
    devtool: config.webpack.hotReload ? config.webpack.devtools : '',
    entry: {
      app: config.webpack.hotReload ? [
        `webpack-hot-middleware/client?path=${config.webpack.hotReloadPath}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'client/main.js')
      ] : [
        path.join(constants.SRC_DIR, 'client/main.js')
      ]
    },
    module: {
      loaders: [{
        loader: 'url-loader?limit=100000',
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime', 'add-module-exports', ['antd', { style: true }]],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        }
      }].concat(stylesLoaders())
    },
    output: {
      path: constants.BUILD_DIR,
      filename: `[name].${config.githash}.js`,
      publicPath: `${config.webpack.hotReloadPath}/build/`
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_BROWSER: true,
            NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`
          }
        })
      ];
      if (config.webpack.hotReload) plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      );
      else plugins.push(
        // Render styles into separate cacheable file to prevent FOUC and
        // optimize for critical rendering path.
        new ExtractTextPlugin('app.css', {
          allChunks: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // eslint-disable-line camelcase
            warnings: false // Because uglify reports irrelevant warnings.
          }
        })
      );
      return plugins;
    })(),
    postcss: () => [autoprefixer({browsers: 'last 2 version'})],
    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  };

  return conf;

};

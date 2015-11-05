import express from 'express';
import makeWebpackConfig from '../makeconfig';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

const app = express();

const webpackConfig = makeWebpackConfig();
const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(compiler));

app.listen(webpackConfig.hotPort, () => {
  console.log('Hot reload server started at port %s', webpackConfig.hotPort);
});
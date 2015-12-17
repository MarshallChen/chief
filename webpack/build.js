import constants from './constants';
import fs from 'fs';
import gutil from 'gulp-util';
import makeWebpackConfig from './makeconfig';
import path from 'path';
import webpack from 'webpack';

export default function build(callback) {
  process.env.BABEL_ENV = 'production';
  const config = makeWebpackConfig();
  webpack(config, (fatalError, stats) => {
    const jsonStats = stats.toJson();

    fs.writeFileSync(path.join(constants.BUILD_DIR, 'bundle-stats.json'), JSON.stringify(jsonStats));

    const buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

    if (buildError)
      throw new gutil.PluginError('webpack', buildError);

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }));

    callback();
  });
}

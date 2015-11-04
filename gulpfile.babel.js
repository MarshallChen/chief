/**
 * @author marshall@nashangban.com
 * first make sure your node.js version >= 0.12.0 which was --harmony by default or use iojs
 * then `npm install -g gulp`
 * `gulp` run locally with hot reload
 * `gulp -p ` run production version
 * currently karma test and karma server doesn't make any sense, so ignore it :(
 */

import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import runSequence from 'run-sequence';
import webpackBuild from './webpack/build';
import mocha from 'gulp-mocha';
import shell from 'gulp-shell';
import config from './src/server/config';

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js',
  ])
  .pipe(eslint())
  .pipe(eslint.format());
};

gulp.task('build-webpack', webpackBuild);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  return runEslint().pipe(eslint.failOnError());
});

gulp.task('mocha', () => {
  gulp.src('src/**/__test__/**/*.js', { read: false })
      .pipe(mocha({
        require: ['./test/mochaSetup.js'],
        reporter: 'spec'
      }))
      .on('error', gutil.log);
});

gulp.task('mocha-watch', (done) => {
  gulp.watch(['test/**/**', 'src/client/**', 'src/shares/**'], ['mocha']);
});

gulp.task('test', (done) => {
  runSequence('eslint-ci', 'mocha', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
// server hot reload
gulp.task('server-nodemon', shell.task(
  path.normalize('node_modules/.bin/nodemon src/server')
));

gulp.task('server', done => {
  if (config.webpack.hotReload) {
    runSequence('server-hot', 'server-nodemon', done);
  } else {
    runSequence('build', 'server-node', done);
  }
});

// gulp.task('server', ['build'], bg('node', 'src/server'));

gulp.task('default', ['server']);

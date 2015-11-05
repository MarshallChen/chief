/**
 * @author marshall@nashangban.com
 */

import bg from 'gulp-bg';
import config from './src/server/config';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import webpackBuild from './webpack/build';

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

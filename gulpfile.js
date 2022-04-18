const { gulp, task, src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const minifyCSS = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

// SRC PATHS
pathSRC = {
  sass: './src/sass/**/*.scss',
  js: './src/js/**/*.js',
  img: './src/img/**/*.+(jpg|svg|png)',
  html: './src/*.html',
};

// DIST PATHS
pathDIST = {
  css: './dist/css/',
  img: './dist/img/',
  js: './dist/js/',
};

// SASS
function sassTask() {
  return src(pathSRC.sass)
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(sourceMaps.write('.'))
    .pipe(
      rename(function (path) {
        if (!path.extname.endsWith('.map')) {
          path.basename += '.min';
        }
      })
    )
    .pipe(dest(pathDIST.css));
}

// JS
function jsTask() {
  return pipeline(
    src(pathSRC.js),
    sourceMaps.init({ loadMaps: true }),
    uglify(),
    babel({
      presets: ['@babel/env'],
    }),
    sourceMaps.write('.'),
    rename(function (path) {
      if (!path.extname.endsWith('.map')) {
        path.basename += '.min';
      }
    }),
    dest(pathDIST.js)
  );
}

// HTMLMIN
function htmlTask() {
  return src(pathSRC.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./'));
}

// IMGAGEMIN
function imageMin() {
  return src(pathSRC.img).pipe(imagemin()).pipe(dest(pathDIST.img));
}

// BROWSER-SYNC + WATCH
task('watch', function () {
  browserSync.init({
    server: {
      basedir: './',
    },
    // browser: 'firefox',
  });

  watch(pathSRC.sass, sassTask).on('change', browserSync.reload);
  watch(pathSRC.js, jsTask).on('change', browserSync.reload);
  watch(pathSRC.html, htmlTask).on('change', browserSync.reload);
});

exports.watch = 'watch';

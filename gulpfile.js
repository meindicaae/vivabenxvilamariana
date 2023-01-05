const config = require("./gulp.config");

// General
const gulp = require("gulp");
var clean = require('gulp-clean');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const del = require("del");
const noop = require('gulp-noop');
const size = require('gulp-size');
const gulpIf = require("gulp-if");
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const data = require('gulp-data');

// BrowserSync
const browserSync = config.development ? require("browser-sync").create() : null;

// Styles
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Images
const imagemin = require("gulp-imagemin");

// Scripts
const uglify = require("gulp-uglify");

// HTML
const htmlmin = require("gulp-htmlmin");
const htmlhint = require("gulp-htmlhint");
const nunjucksRender = require('gulp-nunjucks-render');

/** ************** Styles Task *************** */
function styles() {
    return gulp.src(
        [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/cookieconsent/build/cookieconsent.min.css',
            config.styles.src
        ]
    )
    .pipe(concat("bundle.css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpIf(sourcemaps, sourcemaps.init()))
    .pipe(sass(config.styles.sassOpts).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
    .pipe(gulpIf(sourcemaps, sourcemaps.write('.')))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(config.styles.build))
    .pipe(gulpIf(browserSync, browserSync.reload({ stream: true }) ));
}

exports.styles = styles;

/** ************** Scripts Task *************** */

function scripts() {
    return gulp.src(
        [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/inputmask/dist/jquery.inputmask.min.js',
            'node_modules/@popperjs/core/dist/umd/popper.js',
            'node_modules/popper.js/dist/umd/popper.js',
            'node_modules/cookieconsent/build/cookieconsent.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
            config.scripts.src
        ]
    )
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(config.scripts.build))
    .pipe(gulpIf(browserSync, browserSync.reload({ stream: true }) ));
}

exports.scripts = scripts;

/** ************** Images Task *************** */

function images() {
    return gulp.src(config.images.src)
    .pipe(newer(config.images.build))
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.build))
    .pipe(gulpIf(browserSync, browserSync.reload({ stream: true }) ));
}

exports.images = images;

/** ************** Fonts Task *************** */

function fonts() {
    return gulp.src(
        [
            'node_modules/font-awesome/fonts/*',
            'fonts/*',
            config.fonts.src
        ]
    )
    .pipe(gulp.dest(config.fonts.build))
    .pipe(gulpIf(browserSync, browserSync.reload({ stream: true }) ));
}

exports.fonts = fonts;

/** ************** HTML Task *************** */
function html() {
    var stream =  gulp.src(config.html.src, { base: 'src/templates' })
        .pipe(plumber())
        .pipe(data(() => require('./src/data.json')))
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
        
        if(!config.development){
            stream = stream.pipe(htmlmin({ collapseWhitespace: true }));
        }
        
        stream = stream.pipe(gulp.dest(config.html.build))
        .pipe(gulpIf(browserSync, browserSync.reload({ stream: true }) ));

        return stream;
}

exports.html = html;

/** ************** Watch Task *************** */

function watch(done) {

  gulp.watch(config.styles.watch, gulp.series(styles));

  gulp.watch(config.scripts.watch, gulp.series(scripts));

  gulp.watch(config.html.watch, gulp.series(html));

  gulp.watch(config.images.watch, gulp.series(images));

  done();
}

exports.watch = watch;

/** ************** Clear Task *************** */

function clear() {
    return del([config.paths.build]);
}

exports.clear = clear;

/** ************** Server Task *************** */

function server(done) {
  if (browserSync) browserSync.init(config.browserSync);
  done();
}

function reload(done) {
    if (browserSync) browserSync.reload({ stream: true });
    done();
}

exports.default = gulp.series(clear, gulp.parallel(styles, scripts, images, fonts, html), server, watch);

exports.build = gulp.series(clear, styles, scripts, images, fonts, html);

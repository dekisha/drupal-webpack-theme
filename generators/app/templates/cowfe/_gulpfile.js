//VARIABLES
var gulp = require('gulp'),
  gp_sass = require('gulp-sass'),
  gp_sourcemaps = require('gulp-sourcemaps'),
  gp_postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  postcss_font_awesome = require('postcss-font-awesome'),
  browserSync = require('browser-sync').create(),
  gp_concat = require('gulp-concat'),
  gp_uglify = require('gulp-uglify'),
  gp_postcss_size = require('postcss-size'),
  gp_assets = require('postcss-assets'),
  gp_filter = require('gulp-filter'),
  gp_livereload = require('gulp-livereload'),
  gp_header = require('gulp-header'),
  postcss_svg = require('postcss-svg'),
  gp_sassGlob = require('gulp-sass-glob'),
  processors = [
    autoprefixer({
      browsers: ['last 5 versions', 'IE 9', 'IE 10'],
      cascade: false
    }),
    postcss_font_awesome,
    gp_assets({
      loadPaths: ['assets/images']
    }),
    gp_postcss_size,
    postcss_svg({
      paths: ['assets/svg']
    })
  ],
  jsfiles = [<%
    if( props.npm.slick ) { %>'node_modules/slick-carousel/slick/slick.js',<% } %>
    'assets/js/scripts.js'
  ],
  scssfiles = [
    'assets/scss/*.scss'
  ],
  sassWatcher = [
    'assets/**/**.scss'
  ],
  fonts = [
    'node_modules/font-awesome/fonts/*'
  ];

//SETTINGS
// Added task for browser-sync, enable browserSync.reload  for livereload
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'cofe.loc',   // site url
    open: false          // turnoff auto open on browsersync start
  });
});

//FA FONTS
gulp.task('fonts', function() {
  return gulp.src(fonts)
  .pipe(gulp.dest('fonts'));
});

//CSS
gulp.task('styles', function() {
  return gulp.src(scssfiles)
    .pipe(gp_header('$debug: true;'))
    .pipe(gp_sourcemaps.init())
    .pipe(gp_sass().on('error', gp_sass.logError))
    .pipe(gp_postcss(processors))
    .pipe(gp_sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(gp_filter('**/*.css'))
    .pipe(gp_livereload());
    // .pipe(browserSync.reload({stream: true}));
});

//CSS MINIFY
gulp.task('styles_prod', function() {
  return gulp.src(scssfiles)
    // .pipe(header('$debug: false;')) set as default from sass
    .pipe(gp_sass({outputStyle: 'compressed'}).on('error', gp_sass.logError))
    .pipe(gp_postcss(processors))
    .pipe(gulp.dest('css'));
});

//JS
gulp.task('scripts', function() {
  return gulp.src(jsfiles)
    .pipe(gp_sourcemaps.init())
    .pipe(gp_concat('scripts.js'))
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest('js'));
});

//JS MINIFY/UGLIFY
gulp.task('scripts_prod', function() {
  return gulp.src(jsfiles)
    .pipe(gp_concat('scripts.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('js'));
});

//WATCH
// gulp.task('watch' ,['browser-sync'] , function() {

gulp.task('watch', function() {
  gulp.watch(sassWatcher, ['styles']);
  gulp.watch(jsfiles, ['scripts']);
  gp_livereload.listen();
});

gulp.task('w' ,['browser-sync'] , function() {
  // gulp.watch(scssfiles, ['styles']);
  gulp.watch(sassWatcher, ['styles']);
  gulp.watch(jsfiles, ['scripts']);
  gp_livereload.listen();
  gulp.watch('*.html').on('change', browserSync.reload);
});

//DEFAULT
gulp.task('default', ['styles_prod', 'scripts_prod']);

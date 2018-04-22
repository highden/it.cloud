const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglifyJs = require('gulp-uglify');
const concatJs = require('gulp-concat');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cmq = require('gulp-combine-mq');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');

const paths = {
  src: {
    styles: {
      app: 'src/scss/style.scss',
      appAll: 'src/scss/**/*.scss',
      libs: [
        './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
        './node_modules/swiper/dist/css/swiper.min.css'
      ]
    },
    scripts: {
      appAll: [
        './src/js/main.js'
      ],
      libs: [
        // './node_modules/element-closest/element-closest.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
        './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
        './node_modules/swiper/dist/js/swiper.jquery.js',
        // './src/js/libs/detect.js'
      ]
    },
    images: {
      all: 'src/images/*'
    }
  },
  web: {
    styles: {
      app: {
        file: 'style.css',
        dir: 'web/css'
      },
      libs: {
        file: 'libs.css',
        dir: './web/css'
      }
    },
    scripts: {
      app: {
        file: 'main.js',
        dir: './web/js'
      },
      libs: {
        file: 'libs.js',
        dir: './web/js/libs'
      }
    },
    images: {
      app: 'web/img'
    }
  }
};

gulp.task('scss', function () {
  return gulp.src(paths.src.styles.app)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cmq({
      beautify: true
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.web.styles.app.dir));
});

gulp.task('libsCss', function () {
  return gulp.src(paths.src.styles.libs)
    .pipe(concatCss(paths.web.styles.libs.file))
    .pipe(cmq({
      beautify: true
    }))
    .pipe(gulp.dest(paths.web.styles.libs.dir));
});

gulp.task('libsJs', function () {
  return gulp.src(paths.src.scripts.libs)
    .pipe(concatJs(paths.web.scripts.libs.file))
    .pipe(uglifyJs().on('error', notify.onError()))
    .pipe(gulp.dest(paths.web.scripts.libs.dir));
});

gulp.task('js', function () {
  return gulp.src(paths.src.scripts.appAll)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['env'] }).on('error', notify.onError()))
    .pipe(concatJs(paths.web.scripts.app.file))
    .pipe(uglifyJs().on('error', notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.web.scripts.app.dir));
});

gulp.task('images', function() {
  return gulp.src(paths.src.images.all)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.web.images.app));
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './web'
    }
  });
  gulp.watch([paths.src.styles.appAll], ['scss']);
  gulp.watch([paths.src.images.all], ['images']);
  gulp.watch([paths.src.scripts.appAll], ['js']);
  browserSync.watch('**/*.*').on('change', browserSync.reload);
});

gulp.task('default', [
  'scss',
  'libsCss',
  'libsJs',
  'js',
  'images',
  'watch'
]);

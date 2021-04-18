import "@babel/register";
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import bro from "gulp-browserify";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/main.js",
    dest: "static/js",
    watch: "assets/js/**/*.js",
  },
};

const clean = () => del(["static"]);

const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
};

const js = () => {
  return gulp
    .src(paths.js.src)
    .pipe(bro({ transform: ["babelify"] }))
    .pipe(gulp.dest(paths.js.dest));
};
const watch = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};
const prepare = gulp.series([clean]);

const assets = gulp.parallel([styles, js]);

export const development = gulp.series([prepare, assets, watch]);

export const production = gulp.series([prepare, assets]);

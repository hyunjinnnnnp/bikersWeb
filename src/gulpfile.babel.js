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

gulp.task("clean", () => del(["static"]));

gulp.task("styles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
});
gulp.task("js", () => {
  return gulp
    .src(paths.js.src)
    .pipe(bro({ transform: ["babelify"] }))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task("watchFiles", () => {
  gulp.watch(paths.styles.watch, ["js"]);
  gulp.watch(paths.styles.watch, ["styles"]);
});

gulp.task("production", ["clean", "js", "styles"]);
gulp.task("development", ["clean", "js", "styles", "watchFiles"]);

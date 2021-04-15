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

// eslint-disable-next-line import/prefer-default-export
//const clean = () => del(["static"]);
gulp.task("clean", () => del(["static"]));

// const styles = () =>
//   gulp
//     .src(paths.styles.src)
//     .pipe(sass().on("error", sass.logError))
//     .pipe(
//       autoprefixer({
//         cascade: false,
//       })
//     )
//     .pipe(minifyCSS())
//     .pipe(gulp.dest(paths.styles.dest));

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
// const js = () =>
//   gulp
//     .src(paths.js.src)
//     .pipe(bro({ transform: ["babelify"] }))
//     .pipe(gulp.dest(paths.js.dest));

gulp.task("js", () => {
  return gulp
    .src(paths.js.src)
    .pipe(bro({ transform: ["babelify"] }))
    .pipe(gulp.dest(paths.js.dest));
});

// const watchFiles = () => {
//   gulp.watch(paths.styles.watch, styles);
//   gulp.watch(paths.js.watch, js);
// };
gulp.task("watchFiles", () => {
  gulp.watch(paths.styles.watch, ["js"]);
  gulp.watch(paths.styles.watch, ["styles"]);
});

// exports.production = gulp.series(clean, styles, js);
// exports.development = gulp.series(clean, styles, js, watchFiles);
gulp.task("production", ["clean", "js", "styles"]);
gulp.task("development", ["clean", "js", "styles", "watchFiles"]);
//const dev = gulp.series(clean, styles, js);

// export default dev;

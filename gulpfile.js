var gulp = require("gulp"),
  connect = require("gulp-connect"),
  pug = require("gulp-pug"),
  plumber = require("gulp-plumber");

function reload(done) {
  connect.server({
    livereload: true,
    port: 8080,
    host: "0.0.0.0",
    root: "public",
  });
  done();
}

function html() {
  return gulp.src("public/*.html").pipe(plumber()).pipe(connect.reload());
}

function views() {
  return gulp
    .src("src/pug/pages/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./public/"))
    .pipe(connect.reload());
}

function watchTask(done) {
  gulp.watch("public/*.html", html);
  gulp.watch("src/pug/**/*.pug", views);
  done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(gulp.parallel(html, views));

exports.reload = reload;
exports.html = html;
exports.views = views;
exports.watch = watch;
exports.build = build;
exports.default = watch;

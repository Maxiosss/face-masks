import { src, dest, watch, series } from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import browserSync from "browser-sync";
import fileInclude from "gulp-file-include";
import terser from "gulp-terser";
import { deleteAsync } from "del";

const sassCompiler = gulpSass(dartSass);
const bs = browserSync.create();


function styles() {
  return src("src/scss/style.scss", { sourcemaps: true })
    .pipe(sassCompiler().on("error", sassCompiler.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest("dist/css", { sourcemaps: "." }))
    .pipe(bs.reload({ stream: true }));
}

function html() {
  return src("src/*.html")
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest("dist"))
    .pipe(bs.stream());
}

function scripts() {
  return src("src/js/*.js")
    .pipe(terser())
    .pipe(dest("dist/js"))
    .pipe(bs.stream());
}

function clean() {
  return deleteAsync([
    "dist/**",
    "!dist/images",
    "!dist/images/**",
    "!dist/css",
    "!dist/css/**",
  ]);
}

function serve() {
  bs.init({ server: { baseDir: "dist" } });
  watch("src/scss/**/*.scss", styles);
  watch("src/**/*.html", html);
  watch("src/js/*.js", scripts);
}

export const build = series(clean, styles, html, scripts);
export default series(build, serve);

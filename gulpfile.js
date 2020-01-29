const gulp = require ('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//compile scss to css
function style(){
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
}

exports.style = style;

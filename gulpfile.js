const gulp = require ('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

const root = './src/',
    styleWatch = root + 'scss/**/*.scss',
    htmlWatch = root + '**/*.html',
    jsWatch = root + 'js/**/*.js'
;

//compile scss to css
function style(){
    return gulp.src(styleWatch)
        .pipe(sass())
        .pipe(gulp.dest(root+'css/'))
        .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: root
        }
    });
    gulp.watch(styleWatch, style);
    gulp.watch(htmlWatch).on('change', browserSync.reload);
    gulp.watch(jsWatch).on('change', browserSync.reload);
}


exports.style = style;
exports.watch = watch;

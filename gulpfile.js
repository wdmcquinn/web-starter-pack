const { gulp, watch, series, src, dest } = require ('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

const root = './src/',
    styleWatch = root + 'scss/**/*.scss',
    htmlWatch = root + '**/*.html',
    jsWatch = root + 'js/**/*.js',
    dist = './dist'
;

//compile scss to css
function style(){
    return src(styleWatch)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(root+'css/'))
        .pipe(browserSync.stream());
}

function watcher(){
    browserSync.init({
        server: {
            baseDir: root
        }
    });
    watch(styleWatch, style);
    watch(htmlWatch).on('change', browserSync.reload);
    watch(jsWatch).on('change', browserSync.reload);
}
function copy(path, pathout){
    return src(path)
    .pipe(dest(pathout));
}

function build(cb){
   copy(htmlWatch, dist);
   copy(root+'css/**/*.css', dist+'/css/')
   copy(root+'js/**/*.js', dist+'/js/')
   cb();
}


exports.style = style;
exports.watcher = watcher;
exports.build = build;
exports.copy;

exports.default = series(watcher)

var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

gulp.task('watch',function(){
  gulp.watch('src/html/**/*.html',gulp.series('fileinclude'));
  gulp.watch('src/scss/**/*.scss',gulp.series('sass'));
  gulp.watch('src/sprite/**/*.{png,jpg,gif,svg,json}',gulp.series('sprite'));
  gulp.watch('src/img/**/*.{png,jpg,gif,svg,json}',gulp.series('copyimg'));
});

gulp.task('sass',function(done){
  done();
  return gulp.src('src/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('.',{includeContent: true}))
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('sprite', function(done) {
  var spriteData = gulp.src('src/sprite/*.png')

  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    padding: 4,
    imgPath: 'dist/im/sprite.png'
  }));

  var imgStream = new Promise(function(resolve) {
    spriteData.img
    .pipe(gulp.dest('./dist/im/'))
    .on('end',resolve);
  });

  var cssStream = new Promise(function(resolve) {
    spriteData.css
    .pipe(gulp.dest('./src/scss/sprite/'))
    .on('end',resolve);
  });
  
  done();
  return Promise.all([imgStream, cssStream]);
});

gulp.task('fileinclude', function(done) {
    gulp.src(['./src/html/index.html'], {base : './src/html'})
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html/include/'
        }))
    .pipe(gulp.dest('./dist/html'));
    done();
});

gulp.task('copyimg', function() {
    return gulp.src(['./src/img/**/*.{png,jpg,gif,svg,json}','./src/img/*.{png,jpg,gif,svg,json}'])
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('default', gulp.parallel(gulp.series('fileinclude', 'sass', 'sprite', 'copyimg')));
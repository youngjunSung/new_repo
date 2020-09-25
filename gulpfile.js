var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

// gulp.task('default', ['fileinclude','sass']);

gulp.task('sass',function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('.',{includeContent: true}))
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('watch',function(){
  gulp.watch('src/scss/**/*.scss',['sass']);
});

gulp.task('sprite', function() {
  var spriteData = gulp.src('src/sprite_img/*.png')

  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    padding: 4,
    imgPath: '../img/sprite.png'
  }));

  var imgStream = new Promise(function(resolve) {
    spriteData.img
    .pipe(gulp.dest('./dist/sp-img/'))
    .on('end',resolve);
  });

  var cssStream = new Promise(function(resolve) {
    spriteData.css
    .pipe(gulp.dest('src/sprite_scss/'))
    .on('end',resolve);
  });
  
  return Promise.all([imgStream, cssStream]);
});

gulp.task('fileinclude', function(done) {
    gulp.src(['./src/html/index.html', './src/html/include/*.html'], {base : './src/html'})
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html/include/*.html'
        }))
    .pipe(gulp.dest('./dist/html'));
    done();
});

gulp.task(copyimg, function() {
    return gulp.src(['src/img/**/*.{png,jpg,gif,svg,json}','src/img/*.{png,jpg,gif,svg,json}'])
        .pipe(gulp.dest('./dist/img'));
});
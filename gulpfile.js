var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

//dist 폴더를 기준으로 웹서버 실행
// gulp.task('server',gulp.series('fileinclude', 'sass', 'sprite', 'copyimg'), function () {
//   return browserSync.init({
//       server: {
//           baseDir: './dist'
//       }
//   });
// });

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('src/html/**/*.html',gulp.series('fileinclude')).on("change", browserSync.reload);
  gulp.watch('src/scss/**/*.scss',gulp.series('sass')).on("change", browserSync.reload);
  gulp.watch('src/sprite/**/*.{png,jpg,gif,svg,json}',gulp.series('sprite')).on("change", browserSync.reload);
  gulp.watch('src/img/**/*.{png,jpg,gif,svg,json}',gulp.series('copyimg')).on("change", browserSync.reload);
});

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
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('.',{includeContent: true}))
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('sprite', function(done) {
  var spriteData = gulp.src('src/sprite/*.png')

  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    padding: 4,
    imgPath: '../im/sprite.png'
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
    gulp.src(['./src/html/*.html'],{allowEmpty:true}, {base : './src/html'})
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

gulp.task('default', gulp.series('fileinclude', 'sass', 'sprite', 'copyimg'));
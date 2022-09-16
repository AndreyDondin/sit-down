// Достаем нужные функции из галпа
// src - доставет файлы
// dest - сохраняет файлы при сборке
// watch - слежение
// series - вызывает функции в экспорте последовательно
// parallel - вызывает функции в экспорте параллельно
const { src, dest, series, watch, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass')); //преобразование sass
const fileInclude = require('gulp-file-include'); //подключение импортированных html
const autoprefixer = require('gulp-autoprefixer'); // автопрефиксер для разных браузеров
const cleanCSS = require('gulp-clean-css'); // сжатие
const image = require('gulp-image'); // сжатие картинок
const notify = require('gulp-notify'); //уведомления об ошибках
const sourcemaps = require('gulp-sourcemaps'); // смотреть в каком файле что находится
const rename = require('gulp-rename'); //переименование в min.css
const svgSprite = require('gulp-svg-sprite'); //автозапаковка свг в спрайт
const del = require('del'); // очищение папки сборки
const webpack = require('webpack');
const webpackStream = require('webpack-stream'); //обработка js для модулей
const babel = require('gulp-babel'); // преобразует новый js в старый для поддержки старых браузеров
const uglify = require('gulp-uglify-es').default; //сжатие и нечитаемость js
const htmlMin = require('gulp-htmlmin'); // сжатие html
const browserSync = require('browser-sync').create(); // слежение за изменениями

//достаем файлы,которые могут понадобится
const resources = () => {
  return src('src/res/**').pipe(dest('dist/res'));
};
//переносим шрифты
const fonts = () => {
  return src('src/fonts/**').pipe(dest('dist/fonts'));
};
//перенос стилей библиотек
const styleDist = () => {
  return src('src/styles/*.css').pipe(dest('dist/styles'));
};
//очищение dist
const clean = () => {
  return del('dist');
};

//стили
const styles = () => {
  return (
    src('./src/styles/**/*.scss') // находим в папке src/scss все папки и файлы с расширением scss
      .pipe(sourcemaps.init()) // чтобы мы могли видеть где что до изменений
      .pipe(sass.sync().on('error', notify.onError()))
      .pipe(
        rename({
          // добавляем суффикс min
          suffix: '.min',
        })
      )
      // .pipe(
      //   // делаем автопрефикс
      //   autoprefixer({
      //     cascade: false,
      //   })
      // )
      // .pipe(
      //   // сжимаем, уровень 2 средний
      //   cleanCSS({
      //     level: 2,
      //   })
      // )
      .pipe(sourcemaps.write())
      .pipe(dest('./dist/styles')) // сохранение проекта в папку dist
      .pipe(browserSync.stream())
  ); //стриминг
};

//html
const htmlInclude = () => {
  return (
    src(['./src/**/*.html'])
      .pipe(
        fileInclude({
          //подключение html include
          prefix: '@',
          basepath: '@file',
        })
      )
      // .pipe(
      //   htmlMin({
      //     collapseWhitespace: true,
      //   })
      // )
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      .pipe(dest('./dist')) // сохранение проекта в папку dist
      .pipe(browserSync.stream())
  ); //стриминг
};

//картинки
const images = async () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.webp',
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
  ])
    .pipe(image())
    .pipe(dest('dist/img'));
};

//запаковка в спрайт
const svg = () => {
  return src('./img/sprite/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../icon.svg',
          },
        },
      })
    )
    .pipe(dest('dist/img/sprite'));
};

//скрипты
const scripts = () => {
  return (
    src('./src/js/**/*.js')
      .pipe(
        // для работы с модулями в js
        webpackStream({
          output: {
            filename: 'main.js',
          },
          module: {
            rules: [
              {
                test: /\.m?.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
              },
            ],
          },
        })
      )
      .pipe(sourcemaps.init())
      // .pipe(
      //   babel({
      //     presets: ['@babel/env'],
      //   })
      // )
      .pipe(uglify().on('error', notify.onError()))
      .pipe(sourcemaps.write())
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      .pipe(dest('./dist/js'))
      .pipe(browserSync.stream())
  );
};

//вотчинг
const watchFile = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  watch('src/**/*.html', htmlInclude);
  watch('src/styles/**/*.scss', styles);
  watch('src/img/**/*.webp', images);
  watch('src/img/**/*.png', images);
  watch('src/img/**/*.jpg', images);
  watch('src/img/**/*.jpeg', images);
  watch('src/img/sprite/**/*.svg', svg);
  watch('src/fonts/**', fonts);
  watch('src/res/**', resources);
  watch('./src/js/**/*.js', scripts);
};

// buil версия
const htmlIncludeBuild = () => {
  return src(['./src/**/*.html'])
    .pipe(
      fileInclude({
        //подключение html include
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('./dist')) // сохранение проекта в папку dist
    .pipe(browserSync.stream()); //стриминг
};

const stylesBuild = () => {
  return src('./src/styles/**/*.scss')
    .pipe(
      sass
        .sync({
          outputStyle: 'expanded',
        })
        .on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest('./dist/styles'));
};

const scriptsBuild = () => {
  return src('./src/js/**/*.js')
    .pipe(
      // для работы с модулями в js
      webpackStream({
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [
            {
              test: /\.m?.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(uglify().on('error', notify.onError()))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(dest('./dist/styles'));
};

exports.default = series(
  clean,
  parallel(htmlInclude, svg, scripts, styleDist),
  fonts,
  resources,
  styles,
  watchFile
);

exports.build = series(
  clean,
  parallel(htmlIncludeBuild, svg, images, scriptsBuild),
  fonts,
  resources,
  stylesBuild
);

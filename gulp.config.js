require("dotenv").config();

const dir = {
  src: 'src/',
  build: 'build/',
};

const env = {
  isProd: (process.env.NODE_ENV || "development").trim().toLowerCase() === "production",
  isDev: (process.env.NODE_ENV || "development").trim().toLowerCase() === "development",
};

module.exports = {
  production: env.isProd,
  development: env.isDev,
  paths: {
    src: dir.src,
    build: dir.build
  },
  browserSync: {
    server: {
      baseDir: dir.build,
      index: "index.html",
    },
    port: 6969,
    open: false,
  },
  styles: {
    src: `${dir.src}scss/**/*.scss`,
    build: `${dir.build}css/`,
    watch: `${dir.src}scss/**/*.scss`,
    sassOpts: {
      sourceMap: env.isDev,
      outputStyle: 'nested',
      imagePath: '/images/',
      precision: 5,
      errLogToConsole: true,
    }
  },
  scripts: {
    src: `${dir.src}js/**/*.js`,
    build: `${dir.build}js/`,
    watch: `${dir.src}js/**/*.js`,
  },
  images: {
    src: `${dir.src}images/**/*`,
    build: `${dir.build}images/`,
    watch: `${dir.src}images/**/*`,
  },
  fonts: {
    src: `${dir.src}fonts/**/*`,
    build: `${dir.build}fonts/`,
  },
  html: {
    src: `${dir.src}templates/*.{html,njk}`,
    build: dir.build,
    watch: `${dir.src}templates/**/*.{html,njk}`,
  }
};

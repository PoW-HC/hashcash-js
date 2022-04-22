// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const npsUtils = require('nps-utils');

const series = npsUtils.series;
const concurrent = npsUtils.concurrent;
const rimraf = npsUtils.rimraf;
const crossEnv = npsUtils.crossEnv;

// eslint-disable-next-line no-undef
module.exports = {
  scripts: {
    test: {
      default: crossEnv('NODE_ENV=test jest --coverage'),
      update: crossEnv('NODE_ENV=test jest --coverage --updateSnapshot'),
      watch: crossEnv('NODE_ENV=test jest --watch'),
    },
    build: {
      description: 'delete the dist directory and run all builds',
      default: series(rimraf('dist'), concurrent.nps('build.es', 'build.cjs', 'build.umd.main', 'build.umd.min')),
      es: {
        description: 'run the build with rollup (uses rollup.config.js)',
        script: 'rollup --config --environment FORMAT:es',
      },
      cjs: {
        description: 'run rollup build with CommonJS format',
        script: 'rollup --config --environment FORMAT:cjs',
      },
      umd: {
        min: {
          description: 'run the rollup build with sourcemaps',
          script: 'rollup --config --sourcemap --environment MINIFY,FORMAT:umd',
        },
        main: {
          description: 'builds the cjs and umd files',
          script: 'rollup --config --sourcemap --environment FORMAT:umd',
        },
      },
    },
    docs: {
      description: 'Generates table of contents in README',
      script: 'doctoc README.md',
    },
    lint: {
      description: 'lint the entire project',
      script: 'eslint src/*.ts',
    },
    typescript: {
      default: {
        description: 'typescript',
        script: 'eslint src/*.ts',
      },
    },
    validate: {
      description: 'This runs several scripts to make sure things look good before committing or on clean install',
      default: concurrent.nps('lint', 'typescript', 'build', 'test'),
    },
  },
  options: {
    silent: false,
  },
};

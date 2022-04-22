import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

// eslint-disable-next-line no-undef
const minify = process.env.MINIFY;
// eslint-disable-next-line no-undef
const format = process.env.FORMAT;
const es = format === 'es';
const umd = format === 'umd';
const cjs = format === 'cjs';

let output;

if (es) {
  output = { file: `dist/index.es.js`, format: 'es' };
} else if (umd) {
  if (minify) {
    output = {
      file: `dist/index.umd.min.js`,
      format: 'umd',
    };
  } else {
    output = { file: `dist/index.umd.js`, format: 'umd' };
  }
} else if (cjs) {
  output = { file: `dist/index.cjs.js`, format: 'cjs' };
} else if (format) {
  throw new Error(`invalid format specified: "${format}".`);
} else {
  throw new Error('no format specified. --environment FORMAT:xxx');
}

export default {
  input: 'src/index.ts',
  output: Object.assign(
    {
      name: '@pow-hc/hashcash',
      exports: 'named',
    },
    output,
  ),
  external: makeExternalPredicate(
    umd ? Object.keys(pkg.peerDependencies || {}) : [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  ),
  plugins: [
    cleanup({ comments: ['eslint', /^\*-/] }),
    copy({
      targets: [{ src: 'src/hashcash.wasm', dest: 'dist/' }],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules', '**/__tests__/*', '**/*.test.ts', '*.test.ts'],
    }),
    resolve({ mainFields: ['jsnext:main'] }),
    json(),
    commonjs({ include: 'node_modules/**' }),
    babel({
      exclude: ['node_modules/**', '*.test.ts'],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: !cjs }]],
      babelHelpers: 'runtime',
    }),
    umd
      ? replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development'),
        })
      : null,
    minify ? terser() : null,
  ].filter(Boolean),
};

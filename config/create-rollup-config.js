import path from 'path';
// import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import yaml from '@rollup/plugin-yaml';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const externals = {
  axios: 'axios',
  lodash: 'lodash',
  rxjs: 'rxjs',
  parse: 'parse',
  localforage: 'localforage',
  redux:'redux',
  immer:'immer',
  'redux-thunk': 'redux-thunk',
  'localforage-cordovasqlitedriver': 'localforage-cordovasqlitedriver',
  'rxjs/operators': 'rxjs/operators',
  'firebase/app': 'firebase/app',
  '@flew/core': '@flew/core',
  '@flew/network': '@flew/network',
  '@flew/cache': '@flew/cache',
  '@flew/state': '@flew/state',
};

export function createRollupConfig(
  distDir,
  name,
  format,
  suffix,
  minify = false
) {
  return {
    input: path.resolve(__dirname, './src/index.ts'),
    external: Object.keys(externals),
    output: {
      file: path.resolve(distDir, `${name}.${suffix}`),
      format,
      name,
      sourcemap: true,
      globals: externals,
    },
    plugins: [
      peerDepsExternal(),
      typescript({
        clean: true,
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        useTsconfigDeclarationDir: true,
      }),
      json({
        compact: true,
        indent: '  ',
        preferConst: true,
      }),
      yaml(),
      eslint({
        configFile: path.resolve(__dirname, '../../.eslintrc.js'),
      }),
      // final bundle is getting too big
      // resolve({
      //   modulesOnly: true,
      //   //preferBuiltins: true, mainFields: ['browser']
      // }),
      commonjs(),
      cleanup({
        comments: 'none',
        extensions: ['.ts'],
      }),
      minify ? terser() : null,
    ],
  };
}

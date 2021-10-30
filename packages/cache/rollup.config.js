// Lib
import path from 'path';
import * as pkg from './package.json';
import { createRollupConfig } from '../../config/create-rollup-config';

const distDir = path.resolve(__dirname, './dist');
const { name } = pkg;

const externals = {
  localforage: 'localforage',
  'localforage-cordovasqlitedriver': 'localforage-cordovasqlitedriver',
  '@flew/core': '@flew/core',
};

export default [
  createRollupConfig(distDir, name, 'umd', 'js', false, externals),
  createRollupConfig(distDir, name, 'esm', 'mjs', false, externals),
  createRollupConfig(distDir, name, 'umd', 'min.js', true, externals),
  createRollupConfig(distDir, name, 'esm', 'min.mjs', true, externals),
];

// Lib
import path from 'path';
import * as pkg from './package.json';
import { createRollupConfig } from '../../config/create-rollup-config';

const distDir = path.resolve(__dirname, './dist');
const { name } = pkg;

const externals = {
  lodash: 'lodash',
  rxjs: 'rxjs',
  '@flew/core': '@flew/core',
  'rxjs/operators': 'rxjs/operators',
  'firebase/app': 'firebase/app',
  'firebase/database': 'firebase/database',
  'firebase/firestore': 'firebase/firestore',
};

export default [
  createRollupConfig(distDir, name, 'umd', 'js', false, externals),
  createRollupConfig(distDir, name, 'esm', 'mjs', false, externals),
  createRollupConfig(distDir, name, 'umd', 'min.js', true, externals),
  createRollupConfig(distDir, name, 'esm', 'min.mjs', true, externals),
];

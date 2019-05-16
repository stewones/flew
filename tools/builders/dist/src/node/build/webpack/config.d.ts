import { Configuration } from 'webpack';
import { BuildNodeBuilderOptions } from '../node-build.builder';
export declare const OUT_FILENAME = "main.js";
export declare function getWebpackConfig(options: BuildNodeBuilderOptions): Configuration;

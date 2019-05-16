'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
var webpack_1 = require('webpack');
var ts = require('typescript');
var path_1 = require('path');
var license_webpack_plugin_1 = require('license-webpack-plugin');
var CircularDependencyPlugin = require('circular-dependency-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
exports.OUT_FILENAME = 'index.js';
function getWebpackConfig(options) {
  var compilerOptions = getCompilerOptions(options.tsConfig);
  var supportsEs2015 =
    compilerOptions.target !== ts.ScriptTarget.ES3 &&
    compilerOptions.target !== ts.ScriptTarget.ES5;
  var webpackConfig = {
    entry: [options.main],
    devtool: options.sourceMap ? 'source-map' : 'eval',
    mode: options.optimization ? 'production' : 'development',
    output: {
      path: options.outputPath,
      filename: exports.OUT_FILENAME,
      libraryTarget: 'commonjs'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            configFile: options.tsConfig,
            transpileOnly: true,
            // https://github.com/TypeStrong/ts-loader/pull/685
            experimentalWatchApi: true
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.mjs', '.js'],
      alias: getAliases(options, compilerOptions),
      mainFields: (supportsEs2015 ? ['es2015'] : []).concat(['module', 'main'])
    },
    target: 'node',
    node: false,
    performance: {
      hints: false
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tsconfig: options.tsConfig,
        workers: options.maxWorkers || ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
      })
    ],
    watch: options.watch
  };
  var extraPlugins = [];
  if (options.progress) {
    extraPlugins.push(new webpack_1.ProgressPlugin());
  }
  if (options.optimization) {
    webpackConfig.optimization = {
      minimize: false,
      concatenateModules: false
    };
  }
  if (options.extractLicenses) {
    extraPlugins.push(
      new license_webpack_plugin_1.LicenseWebpackPlugin({
        pattern: /.*/,
        suppressErrors: true,
        perChunkOutput: false,
        outputFilename: '3rdpartylicenses.txt'
      })
    );
  }
  if (options.externalDependencies === 'all') {
    webpackConfig.externals = [nodeExternals()];
  } else if (Array.isArray(options.externalDependencies)) {
    webpackConfig.externals = [
      function(context, request, callback) {
        if (options.externalDependencies.includes(request)) {
          // not bundled
          return callback(null, 'commonjs ' + request);
        }
        // bundled
        callback();
      }
    ];
  }
  // process asset entries
  if (options.assets) {
    var copyWebpackPluginPatterns = options.assets.map(function(asset) {
      return {
        context: asset.input,
        // Now we remove starting slash to make Webpack place it from the output root.
        to: asset.output,
        ignore: asset.ignore,
        from: {
          glob: asset.glob,
          dot: true
        }
      };
    });
    var copyWebpackPluginOptions = {
      ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db']
    };
    var copyWebpackPluginInstance = new CopyWebpackPlugin(
      copyWebpackPluginPatterns,
      copyWebpackPluginOptions
    );
    extraPlugins.push(copyWebpackPluginInstance);
  }
  if (options.showCircularDependencies) {
    extraPlugins.push(
      new CircularDependencyPlugin({
        exclude: /[\\\/]node_modules[\\\/]/
      })
    );
  }
  webpackConfig.plugins = webpackConfig.plugins.concat(extraPlugins);
  return webpackConfig;
}
exports.getWebpackConfig = getWebpackConfig;
function getAliases(options, compilerOptions) {
  var replacements = options.fileReplacements.concat(
    compilerOptions.paths
      ? Object.entries(compilerOptions.paths).map(function(_a) {
          var importPath = _a[0],
            values = _a[1];
          return {
            replace: importPath,
            with: path_1.resolve(options.root, values[0])
          };
        })
      : []
  );
  return replacements.reduce(function(aliases, replacement) {
    var _a;
    return __assign(
      {},
      aliases,
      ((_a = {}), (_a[replacement.replace] = replacement.with), _a)
    );
  }, {});
}
function getCompilerOptions(tsConfigPath) {
  var readResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
  var tsConfig = ts.parseJsonConfigFileContent(
    readResult.config,
    ts.sys,
    path_1.dirname(tsConfigPath)
  );
  return tsConfig.options;
}

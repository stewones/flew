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
var config_1 = require('./config');
var core_1 = require('@angular-devkit/core');
var ts = require('typescript');
var license_webpack_plugin_1 = require('license-webpack-plugin');
var CircularDependencyPlugin = require('circular-dependency-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var webpack_1 = require('webpack');
describe('getWebpackConfig', function() {
  var input;
  beforeEach(function() {
    input = {
      main: 'main.ts',
      outputPath: 'dist',
      tsConfig: 'tsconfig.json',
      externalDependencies: 'all',
      fileReplacements: [],
      root: core_1.getSystemPath(core_1.normalize('/root'))
    };
  });
  describe('unconditional options', function() {
    it('should have output options', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.output.filename).toEqual('index.js');
      expect(result.output.libraryTarget).toEqual('commonjs');
    });
    it('should have a rule for typescript', function() {
      var result = config_1.getWebpackConfig(input);
      var typescriptRule = result.module.rules.find(function(rule) {
        return rule.test.test('app/main.ts');
      });
      expect(typescriptRule).toBeTruthy();
      expect(typescriptRule.loader).toEqual('ts-loader');
    });
    it('should split typescript type checking into a separate workers', function() {
      var result = config_1.getWebpackConfig(input);
      var typeCheckerPlugin = result.plugins.find(function(plugin) {
        return plugin instanceof ForkTsCheckerWebpackPlugin;
      });
      expect(typeCheckerPlugin).toBeTruthy();
    });
    it('should target node', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.target).toEqual('node');
    });
    it('should disable performance hints', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.performance).toEqual({
        hints: false
      });
    });
    it('should resolve typescript and javascript', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.resolve.extensions).toEqual(['.ts', '.mjs', '.js']);
    });
    it('should include module and main in mainFields', function() {
      spyOn(ts, 'parseJsonConfigFileContent').and.returnValue({
        options: {
          target: 'es5'
        }
      });
      var result = config_1.getWebpackConfig(input);
      expect(result.resolve.mainFields).toContain('module');
      expect(result.resolve.mainFields).toContain('main');
    });
    it('should not polyfill node apis', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.node).toEqual(false);
    });
  });
  describe('the main option', function() {
    it('should set the correct entry options', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.entry).toEqual(['main.ts']);
    });
  });
  describe('the output option', function() {
    it('should set the correct output options', function() {
      var result = config_1.getWebpackConfig(input);
      expect(result.output.path).toEqual('dist');
    });
  });
  describe('the tsConfig option', function() {
    it('should set the correct typescript rule', function() {
      var result = config_1.getWebpackConfig(input);
      expect(
        result.module.rules.find(function(rule) {
          return rule.loader === 'ts-loader';
        }).options
      ).toEqual({
        configFile: 'tsconfig.json',
        transpileOnly: true,
        experimentalWatchApi: true
      });
    });
    it('should set the correct options for the type checker plugin', function() {
      var result = config_1.getWebpackConfig(input);
      var typeCheckerPlugin = result.plugins.find(function(plugin) {
        return plugin instanceof ForkTsCheckerWebpackPlugin;
      });
      expect(typeCheckerPlugin.options.tsconfig).toBe('tsconfig.json');
    });
    it('should set aliases for compilerOptionPaths', function() {
      spyOn(ts, 'parseJsonConfigFileContent').and.returnValue({
        options: {
          paths: {
            '@npmScope/libraryName': ['libs/libraryName/src/index.ts']
          }
        }
      });
      var result = config_1.getWebpackConfig(input);
      expect(result.resolve.alias).toEqual({
        '@npmScope/libraryName': '/root/libs/libraryName/src/index.ts'
      });
    });
    it('should include es2015 in mainFields if typescript is set es2015', function() {
      spyOn(ts, 'parseJsonConfigFileContent').and.returnValue({
        options: {
          target: 'es2015'
        }
      });
      var result = config_1.getWebpackConfig(input);
      expect(result.resolve.mainFields).toContain('es2015');
    });
  });
  describe('the file replacements option', function() {
    it('should set aliases', function() {
      spyOn(ts, 'parseJsonConfigFileContent').and.returnValue({
        options: {}
      });
      var result = config_1.getWebpackConfig(
        __assign({}, input, {
          fileReplacements: [
            {
              replace: 'environments/environment.ts',
              with: 'environments/environment.prod.ts'
            }
          ]
        })
      );
      expect(result.resolve.alias).toEqual({
        'environments/environment.ts': 'environments/environment.prod.ts'
      });
    });
  });
  describe('the externalDependencies option', function() {
    it('should change all node_modules to commonjs imports', function() {
      var result = config_1.getWebpackConfig(input);
      var callback = jest.fn();
      result.externals[0](null, '@angular/core', callback);
      expect(callback).toHaveBeenCalledWith(null, 'commonjs @angular/core');
    });
    it('should change given module names to commonjs imports but not others', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { externalDependencies: ['module1'] })
      );
      var callback = jest.fn();
      result.externals[0](null, 'module1', callback);
      expect(callback).toHaveBeenCalledWith(null, 'commonjs module1');
      result.externals[0](null, '@angular/core', callback);
      expect(callback).toHaveBeenCalledWith();
    });
    it('should not change any modules to commonjs imports', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { externalDependencies: 'none' })
      );
      expect(result.externals).not.toBeDefined();
    });
  });
  describe('the watch option', function() {
    it('should enable file watching', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { watch: true })
      );
      expect(result.watch).toEqual(true);
    });
  });
  describe('the source map option', function() {
    it('should enable source-map devtool', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { sourceMap: true })
      );
      expect(result.devtool).toEqual('source-map');
    });
    it('should enable source-map devtool', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { sourceMap: false })
      );
      expect(result.devtool).toEqual('eval');
    });
  });
  describe('the optimization option', function() {
    describe('by default', function() {
      it('should set the mode to development', function() {
        var result = config_1.getWebpackConfig(input);
        expect(result.mode).toEqual('development');
      });
    });
    describe('when true', function() {
      it('should set the mode to production', function() {
        var result = config_1.getWebpackConfig(
          __assign({}, input, { optimization: true })
        );
        expect(result.mode).toEqual('production');
      });
      it('should not minify', function() {
        var result = config_1.getWebpackConfig(
          __assign({}, input, { optimization: true })
        );
        expect(result.optimization.minimize).toEqual(false);
      });
      it('should not concatenate modules', function() {
        var result = config_1.getWebpackConfig(
          __assign({}, input, { optimization: true })
        );
        expect(result.optimization.concatenateModules).toEqual(false);
      });
    });
  });
  describe('the max workers option', function() {
    it('should set the maximum workers for the type checker', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { maxWorkers: 1 })
      );
      var typeCheckerPlugin = result.plugins.find(function(plugin) {
        return plugin instanceof ForkTsCheckerWebpackPlugin;
      });
      expect(typeCheckerPlugin.options.workers).toEqual(1);
    });
  });
  describe('the assets option', function() {
    it('should add a copy-webpack-plugin', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, {
          assets: [
            {
              input: 'assets',
              glob: '**/*',
              output: 'assets'
            },
            {
              input: '',
              glob: 'file.txt',
              output: ''
            }
          ]
        })
      );
      // This test isn't great because it's hard to find CopyWebpackPlugin
      expect(
        result.plugins.some(function(plugin) {
          return !(plugin instanceof ForkTsCheckerWebpackPlugin);
        })
      ).toBeTruthy();
    });
  });
  describe('the circular dependencies option', function() {
    it('should show warnings for circular dependencies', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { showCircularDependencies: true })
      );
      expect(
        result.plugins.find(function(plugin) {
          return plugin instanceof CircularDependencyPlugin;
        })
      ).toBeTruthy();
    });
    it('should exclude node modules', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { showCircularDependencies: true })
      );
      var circularDependencyPlugin = result.plugins.find(function(plugin) {
        return plugin instanceof CircularDependencyPlugin;
      });
      expect(circularDependencyPlugin.options.exclude).toEqual(
        /[\\\/]node_modules[\\\/]/
      );
    });
  });
  describe('the extract licenses option', function() {
    it('should extract licenses to a separate file', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { extractLicenses: true })
      );
      var licensePlugin = result.plugins.find(function(plugin) {
        return plugin instanceof license_webpack_plugin_1.LicenseWebpackPlugin;
      });
      var options = licensePlugin.options;
      expect(licensePlugin).toBeTruthy();
      expect(options.pattern).toEqual(/.*/);
      expect(options.suppressErrors).toEqual(true);
      expect(options.perChunkOutput).toEqual(false);
      expect(options.outputFilename).toEqual('3rdpartylicenses.txt');
    });
  });
  describe('the progress option', function() {
    it('should show build progress', function() {
      var result = config_1.getWebpackConfig(
        __assign({}, input, { progress: true })
      );
      expect(
        result.plugins.find(function(plugin) {
          return plugin instanceof webpack_1.ProgressPlugin;
        })
      ).toBeTruthy();
    });
  });
});

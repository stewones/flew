"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var build_webpack_1 = require("@angular-devkit/build-webpack");
var fs_1 = require("fs");
var config_1 = require("./webpack/config");
var path_1 = require("path");
var operators_1 = require("rxjs/operators");
try {
    require('dotenv').config();
}
catch (e) { }
var BuildNodeBuilder = /** @class */ (function () {
    function BuildNodeBuilder(context) {
        this.context = context;
        this.webpackBuilder = new build_webpack_1.WebpackBuilder(this.context);
        this.root = core_1.getSystemPath(this.context.workspace.root);
    }
    BuildNodeBuilder.prototype.run = function (builderConfig) {
        var _this = this;
        var options = this.normalizeOptions(builderConfig.options, builderConfig.sourceRoot);
        var config = config_1.getWebpackConfig(options);
        return this.webpackBuilder
            .runWebpack(config, function (stats) {
            if (options.statsJson) {
                fs_1.writeFileSync(path_1.resolve(_this.root, options.outputPath, 'stats.json'), JSON.stringify(stats.toJson(), null, 2));
            }
            _this.context.logger.info(stats.toString());
        })
            .pipe(operators_1.map(function (buildEvent) { return (__assign({}, buildEvent, { outfile: path_1.resolve(_this.root, options.outputPath, config_1.OUT_FILENAME) })); }));
    };
    BuildNodeBuilder.prototype.normalizeOptions = function (options, sourceRoot) {
        return __assign({}, options, { root: this.root, main: path_1.resolve(this.root, options.main), outputPath: path_1.resolve(this.root, options.outputPath), tsConfig: path_1.resolve(this.root, options.tsConfig), fileReplacements: this.normalizeFileReplacements(options.fileReplacements), assets: this.normalizeAssets(options.assets, sourceRoot) });
    };
    BuildNodeBuilder.prototype.normalizeAssets = function (assets, sourceRoot) {
        var _this = this;
        return assets.map(function (asset) {
            if (typeof asset === 'string') {
                var assetPath = core_1.normalize(asset);
                var resolvedAssetPath = path_1.resolve(_this.root, assetPath);
                var resolvedSourceRoot = path_1.resolve(_this.root, sourceRoot);
                if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
                    throw new Error("The " + resolvedAssetPath + " asset path must start with the project source root: " + sourceRoot);
                }
                var isDirectory = fs_1.statSync(resolvedAssetPath).isDirectory();
                var input = isDirectory
                    ? resolvedAssetPath
                    : path_1.dirname(resolvedAssetPath);
                var output = path_1.relative(resolvedSourceRoot, path_1.resolve(_this.root, input));
                var glob = isDirectory ? '**/*' : path_1.basename(resolvedAssetPath);
                return {
                    input: input,
                    output: output,
                    glob: glob
                };
            }
            else {
                if (asset.output.startsWith('..')) {
                    throw new Error('An asset cannot be written to a location outside of the output path.');
                }
                return __assign({}, asset, { 
                    // Now we remove starting slash to make Webpack place it from the output root.
                    output: asset.output.replace(/^\//, '') });
            }
        });
    };
    BuildNodeBuilder.prototype.normalizeFileReplacements = function (fileReplacements) {
        var _this = this;
        return fileReplacements.map(function (fileReplacement) { return ({
            replace: path_1.resolve(_this.root, fileReplacement.replace),
            with: path_1.resolve(_this.root, fileReplacement.with)
        }); });
    };
    return BuildNodeBuilder;
}());
exports.default = BuildNodeBuilder;

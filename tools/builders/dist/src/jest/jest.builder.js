"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var path = require("path");
try {
    require('dotenv').config();
}
catch (e) { }
var runCLI = require('jest').runCLI;
var JestBuilder = /** @class */ (function () {
    function JestBuilder() {
    }
    JestBuilder.prototype.run = function (builderConfig) {
        var options = builderConfig.options;
        var config = {
            watch: options.watch,
            coverage: options.codeCoverage,
            bail: options.bail,
            ci: options.ci,
            updateSnapshot: options.updateSnapshot,
            onlyChanged: options.onlyChanged,
            passWithNoTests: options.passWithNoTests,
            silent: options.silent,
            runInBand: options.runInBand,
            globals: JSON.stringify({
                'ts-jest': {
                    tsConfigFile: path.relative(builderConfig.root, options.tsConfig)
                },
                __TRANSFORM_HTML__: true
            })
        };
        if (options.maxWorkers) {
            config.maxWorkers = options.maxWorkers;
        }
        if (options.testNamePattern) {
            config.testNamePattern = options.testNamePattern;
        }
        if (options.setupFile) {
            config.setupTestFrameworkScriptFile = path.join('<rootDir>', path.relative(builderConfig.root, options.setupFile));
        }
        return rxjs_1.from(runCLI(config, [options.jestConfig])).pipe(operators_1.map(function (results) {
            return {
                success: results.results.success
            };
        }));
    };
    return JestBuilder;
}());
exports.default = JestBuilder;

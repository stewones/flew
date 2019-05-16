"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var ts = require("typescript");
var default_resolver_1 = require("jest-resolve/build/default_resolver");
function getCompilerSetup(rootDir) {
    var tsConfigPath = ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.spec.json') ||
        ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.test.json') ||
        ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.jest.json');
    if (!tsConfigPath) {
        console.error("Cannot locate a tsconfig.spec.json. Please create one at " + rootDir + "/tsconfig.spec.json");
    }
    var readResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    var config = ts.parseJsonConfigFileContent(readResult.config, ts.sys, path_1.dirname(tsConfigPath));
    var compilerOptions = config.options;
    var host = ts.createCompilerHost(compilerOptions, true);
    return { compilerOptions: compilerOptions, host: host };
}
var compilerSetup;
module.exports = function (path, options) {
    // Try to use the defaultResolver
    try {
        return default_resolver_1.default(path, options);
    }
    catch (e) {
        // Fallback to using typescript
        compilerSetup = compilerSetup || getCompilerSetup(options.rootDir);
        var compilerOptions = compilerSetup.compilerOptions, host = compilerSetup.host;
        return ts.resolveModuleName(path, options.basedir, compilerOptions, host)
            .resolvedModule.resolvedFileName;
    }
};

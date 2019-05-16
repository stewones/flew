"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var child_process_1 = require("child_process");
var fs_extra_1 = require("fs-extra");
var internal_compatibility_1 = require("rxjs/internal-compatibility");
var file_system_utility_1 = require("@angular-devkit/schematics/tools/file-system-utility");
var core_1 = require("@angular-devkit/core");
var path = require("path");
var url = require("url");
var treeKill = require("tree-kill");
var Cypress = require('cypress'); // @NOTE: Importing via ES6 messes the whole test dependencies.
try {
    require('dotenv').config();
}
catch (e) { }
/**
 * @whatItDoes Implementation of the Cypress Builder, compile Typescript files,
 * build the devServer to serve the app then run Cypress e2e test runner.
 * The builder needs some information from the `angular.json` file:
 * @example:
```
 "my-app-e2e": {
    "root": "apps/my-app-e2e/",
    "projectType": "application",
    "architect": {
      "e2e": {
        "builder": "@nrwl/builders:cypress",
        "options": {
          "cypressConfig": "apps/my-app-e2e/cypress.json",
          "tsConfig": "apps/my-app-e2e/tsconfig.json",
          "devServerTarget": "my-app:serve"
      },
      "configurations": {
        "production": {
          "devServerTarget": "my-app:serve:production"
        }
      }
      }
    }
 }
```
 *
 */
var CypressBuilder = /** @class */ (function () {
    function CypressBuilder(context) {
        this.context = context;
        this.tscProcess = null;
    }
    /**
     * @whatItDoes This is the starting point of the builder.
     * @param builderConfig
     */
    CypressBuilder.prototype.run = function (builderConfig) {
        var _this = this;
        var options = builderConfig.options;
        var tsconfigJson = JSON.parse(file_system_utility_1.readFile(options.tsConfig));
        // Cleaning the /dist folder
        fs_extra_1.removeSync(path.join(path.dirname(options.tsConfig), tsconfigJson.compilerOptions.outDir));
        return this.compileTypescriptFiles(options.tsConfig, options.watch).pipe(operators_1.tap(function () {
            return _this.copyCypressFixtures(options.tsConfig, options.cypressConfig);
        }), operators_1.concatMap(function () {
            return !options.baseUrl && options.devServerTarget
                ? _this.startDevServer(options.devServerTarget, options.watch)
                : rxjs_1.of(null);
        }), operators_1.concatMap(function () {
            return _this.initCypress(options.cypressConfig, options.headless, options.record, options.watch, options.baseUrl, options.browser);
        }), options.watch ? operators_1.tap(rxjs_1.noop) : operators_1.take(1), operators_1.catchError(function (error) {
            throw new Error(error);
        }));
    };
    /**
     * @whatItDoes Compile typescript spec files to be able to run Cypress.
     * The compilation is done via executing the `tsc` command line/
     * @param tsConfigPath
     * @param isWatching
     */
    CypressBuilder.prototype.compileTypescriptFiles = function (tsConfigPath, isWatching) {
        var _this = this;
        if (this.tscProcess) {
            this.killProcess();
        }
        return rxjs_1.Observable.create(function (subscriber) {
            try {
                var args = ['-p', tsConfigPath];
                var tscPath = core_1.getSystemPath(core_1.join(_this.context.workspace.root, '/node_modules/typescript/bin/tsc'));
                if (isWatching) {
                    args.push('--watch');
                    _this.tscProcess = child_process_1.fork(tscPath, args, { stdio: [0, 1, 2, 'ipc'] });
                    subscriber.next({ success: true });
                }
                else {
                    _this.tscProcess = child_process_1.fork(tscPath, args, { stdio: [0, 1, 2, 'ipc'] });
                    _this.tscProcess.on('exit', function (code) {
                        subscriber.next({ success: code === 0 });
                        subscriber.complete();
                    });
                }
            }
            catch (error) {
                if (_this.tscProcess) {
                    _this.killProcess();
                }
                subscriber.error(new Error("Could not compile Typescript files: \n " + error));
            }
        });
    };
    /**
     * @whatItDoes Copy all the fixtures into the dist folder.
     * This is done because `tsc` doesn't handle `json` files.
     * @param tsConfigPath
     */
    CypressBuilder.prototype.copyCypressFixtures = function (tsConfigPath, cypressConfigPath) {
        var cypressConfig = JSON.parse(file_system_utility_1.readFile(cypressConfigPath));
        // DOn't copy fixtures if cypress config does not have it set
        if (!cypressConfig.fixturesFolder) {
            return;
        }
        fs_extra_1.copySync(path.dirname(tsConfigPath) + "/src/fixtures", path.join(path.dirname(cypressConfigPath), cypressConfig.fixturesFolder), { overwrite: true });
    };
    /**
     * @whatItDoes Initialize the Cypress test runner with the provided project configuration.
     * If `headless` is `false`: open the Cypress application, the user will
     * be able to interact directly with the application.
     * If `headless` is `true`: Cypress will run in headless mode and will
     * provide directly the results in the console output.
     * @param cypressConfig
     * @param headless
     * @param baseUrl
     * @param isWatching
     */
    CypressBuilder.prototype.initCypress = function (cypressConfig, headless, record, isWatching, baseUrl, browser) {
        // Cypress expects the folder where a `cypress.json` is present
        var projectFolderPath = path.dirname(cypressConfig);
        var options = {
            project: projectFolderPath
        };
        // If not, will use the `baseUrl` normally from `cypress.json`
        if (baseUrl || this.computedCypressBaseUrl) {
            options.config = { baseUrl: baseUrl || this.computedCypressBaseUrl };
        }
        if (browser) {
            options.browser = browser;
        }
        options.headed = !headless;
        options.record = record;
        return internal_compatibility_1.fromPromise(!isWatching || headless ? Cypress.run(options) : Cypress.open(options)).pipe(operators_1.tap(function () { return (isWatching && !headless ? process.exit() : null); }), // Forcing `cypress.open` to give back the terminal
        operators_1.map(function (result) { return ({
            /**
             * `cypress.open` is returning `0` and is not of the same type as `cypress.run`.
             * `cypress.open` is the graphical UI, so it will be obvious to know what wasn't
             * working. Forcing the build to success when `cypress.open` is used.
             */
            success: result.hasOwnProperty("totalFailed")
                ? result.totalFailed === 0
                : true
        }); }));
    };
    /**
     * @whatItDoes Compile the application using the webpack builder.
     * @param devServerTarget
     * @param isWatching
     * @private
     */
    CypressBuilder.prototype.startDevServer = function (devServerTarget, isWatching) {
        var _this = this;
        var architect = this.context.architect;
        var _a = devServerTarget.split(':'), project = _a[0], targetName = _a[1], configuration = _a[2];
        // Overrides dev server watch setting.
        var overrides = { watch: isWatching };
        var targetSpec = {
            project: project,
            target: targetName,
            configuration: configuration,
            overrides: overrides
        };
        var builderConfig = architect.getBuilderConfiguration(targetSpec);
        return architect.getBuilderDescription(builderConfig).pipe(operators_1.concatMap(function (devServerDescription) {
            return architect.validateBuilderOptions(builderConfig, devServerDescription);
        }), operators_1.tap(function (builderConfig) {
            if (devServerTarget && builderConfig.options.publicHost) {
                var publicHost = builderConfig.options.publicHost;
                if (!/^\w+:\/\//.test(publicHost)) {
                    publicHost = (builderConfig.options.ssl ? 'https' : 'http') + "://" + publicHost;
                }
                var clientUrl = url.parse(publicHost);
                _this.computedCypressBaseUrl = url.format(clientUrl);
            }
            else if (devServerTarget) {
                _this.computedCypressBaseUrl = url.format({
                    protocol: builderConfig.options.ssl ? 'https' : 'http',
                    hostname: builderConfig.options.host,
                    port: builderConfig.options.port.toString(),
                    pathname: builderConfig.options.servePath || ''
                });
            }
        }), operators_1.concatMap(function (builderConfig) { return architect.run(builderConfig, _this.context); }));
    };
    CypressBuilder.prototype.killProcess = function () {
        var _this = this;
        return treeKill(this.tscProcess.pid, 'SIGTERM', function (error) {
            _this.tscProcess = null;
            if (error) {
                if (Array.isArray(error) && error[0] && error[2]) {
                    var errorMessage = error[2];
                    _this.context.logger.error(errorMessage);
                }
                else if (error.message) {
                    _this.context.logger.error(error.message);
                }
            }
        });
    };
    return CypressBuilder;
}());
exports.default = CypressBuilder;

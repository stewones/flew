"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var treeKill = require("tree-kill");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var literals_1 = require("@angular-devkit/core/src/utils/literals");
try {
    require('dotenv').config();
}
catch (e) { }
var NodeExecuteBuilder = /** @class */ (function () {
    function NodeExecuteBuilder(context) {
        this.context = context;
    }
    NodeExecuteBuilder.prototype.run = function (target) {
        var _this = this;
        var options = target.options;
        return this.runWaitUntilTargets(options).pipe(operators_1.concatMap(function (v) {
            if (!v.success) {
                _this.context.logger.error("One of the tasks specified in waitUntilTargets failed");
                return rxjs_1.of({ success: false });
            }
            return _this.startBuild(options).pipe(operators_1.concatMap(function (event) {
                if (event.success) {
                    return _this.restartProcess(event.outfile, options).pipe(operators_1.mapTo(event));
                }
                else {
                    _this.context.logger.error('There was an error with the build. See above.');
                    _this.context.logger.info(event.outfile + " was not restarted.");
                    return rxjs_1.of(event);
                }
            }));
        }));
    };
    NodeExecuteBuilder.prototype.runProcess = function (file, options) {
        if (this.subProcess) {
            throw new Error('Already running');
        }
        this.subProcess = child_process_1.fork(file, options.args, {
            execArgv: this.getExecArgv(options)
        });
    };
    NodeExecuteBuilder.prototype.getExecArgv = function (options) {
        if (!options.inspect) {
            return [];
        }
        if (options.inspect === true) {
            options.inspect = "inspect" /* Inspect */;
        }
        return ["--" + options.inspect + "=localhost:" + options.port];
    };
    NodeExecuteBuilder.prototype.restartProcess = function (file, options) {
        var _this = this;
        return this.killProcess().pipe(operators_1.tap(function () {
            _this.runProcess(file, options);
        }));
    };
    NodeExecuteBuilder.prototype.killProcess = function () {
        var _this = this;
        if (!this.subProcess) {
            return rxjs_1.of(undefined);
        }
        var observableTreeKill = rxjs_1.bindCallback(treeKill);
        return observableTreeKill(this.subProcess.pid, 'SIGTERM').pipe(operators_1.tap(function (err) {
            _this.subProcess = null;
            if (err) {
                if (Array.isArray(err) && err[0] && err[2]) {
                    var errorMessage = err[2];
                    _this.context.logger.error(errorMessage);
                }
                else if (err.message) {
                    _this.context.logger.error(err.message);
                }
            }
        }));
    };
    NodeExecuteBuilder.prototype.startBuild = function (options) {
        var _this = this;
        var builderConfig = this.getBuildBuilderConfig(options);
        return this.context.architect.getBuilderDescription(builderConfig).pipe(operators_1.concatMap(function (buildDescription) {
            return _this.context.architect.validateBuilderOptions(builderConfig, buildDescription);
        }), operators_1.tap(function (builderConfig) {
            if (builderConfig.options.optimization) {
                _this.context.logger.warn(literals_1.stripIndents(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            ************************************************\n            This is a simple process manager for use in\n            testing or debugging Node applications locally.\n            DO NOT USE IT FOR PRODUCTION!\n            You should look into proper means of deploying\n            your node application to production.\n            ************************************************"], ["\n            ************************************************\n            This is a simple process manager for use in\n            testing or debugging Node applications locally.\n            DO NOT USE IT FOR PRODUCTION!\n            You should look into proper means of deploying\n            your node application to production.\n            ************************************************"]))));
            }
        }), operators_1.concatMap(function (builderConfig) {
            return _this.context.architect.run(builderConfig, _this.context);
        }));
    };
    NodeExecuteBuilder.prototype.getBuildBuilderConfig = function (options) {
        var _a = options.buildTarget.split(':'), project = _a[0], target = _a[1], configuration = _a[2];
        return this.context.architect.getBuilderConfiguration({
            project: project,
            target: target,
            configuration: configuration,
            overrides: {
                watch: true
            }
        });
    };
    NodeExecuteBuilder.prototype.runWaitUntilTargets = function (options) {
        var _this = this;
        if (!options.waitUntilTargets || options.waitUntilTargets.length === 0)
            return rxjs_1.of({ success: true });
        return rxjs_1.zip.apply(void 0, options.waitUntilTargets.map(function (b) {
            var _a = b.split(':'), project = _a[0], target = _a[1], configuration = _a[2];
            var builderConfig = _this.context.architect.getBuilderConfiguration({
                project: project,
                target: target,
                configuration: configuration
            });
            return _this.context.architect.getBuilderDescription(builderConfig).pipe(operators_1.concatMap(function (buildDescription) {
                return _this.context.architect.validateBuilderOptions(builderConfig, buildDescription);
            }), operators_1.concatMap(function (builderConfig) {
                return _this.context.architect.run(builderConfig, _this.context);
            }), operators_1.filter(function (e) { return e.success !== undefined; }), operators_1.first());
        })).pipe(operators_1.map(function (results) {
            return { success: !results.some(function (r) { return !r.success; }) };
        }));
    };
    return NodeExecuteBuilder;
}());
exports.NodeExecuteBuilder = NodeExecuteBuilder;
exports.default = NodeExecuteBuilder;
var templateObject_1;

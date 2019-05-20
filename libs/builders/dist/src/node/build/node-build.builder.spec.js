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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var testing_1 = require("@angular-devkit/architect/testing");
var node_build_builder_1 = require("./node-build.builder");
var rxjs_1 = require("rxjs");
var fs = require("fs");
describe('NodeBuildBuilder', function () {
    var builder;
    var testOptions;
    var sourceRoot;
    beforeEach(function () {
        builder = new node_build_builder_1.default({
            host: {},
            logger: new testing_1.TestLogger('test'),
            workspace: {
                root: '/root'
            },
            architect: {}
        });
        sourceRoot = '/root/apps/nodeapp/src';
        testOptions = {
            main: 'apps/nodeapp/src/main.ts',
            tsConfig: 'apps/nodeapp/tsconfig.app.json',
            outputPath: 'dist/apps/nodeapp',
            externalDependencies: 'all',
            fileReplacements: [
                {
                    replace: 'apps/environment/environment.ts',
                    with: 'apps/environment/environment.prod.ts'
                },
                {
                    replace: 'module1.ts',
                    with: 'module2.ts'
                }
            ],
            assets: []
        };
    });
    describe('run', function () {
        it('should call runWebpack', function () {
            var runWebpack = spyOn(builder.webpackBuilder, 'runWebpack').and.returnValue(rxjs_1.of({
                success: true
            }));
            builder.run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:node-build',
                options: testOptions
            });
            expect(runWebpack).toHaveBeenCalled();
        });
        it('should emit the outfile along with success', function () { return __awaiter(_this, void 0, void 0, function () {
            var runWebpack, buildEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        runWebpack = spyOn(builder.webpackBuilder, 'runWebpack').and.returnValue(rxjs_1.of({
                            success: true
                        }));
                        return [4 /*yield*/, builder
                                .run({
                                root: core_1.normalize('/root'),
                                projectType: 'application',
                                builder: '@nrwl/builders:node-build',
                                options: testOptions
                            })
                                .toPromise()];
                    case 1:
                        buildEvent = _a.sent();
                        expect(buildEvent.success).toEqual(true);
                        expect(buildEvent.outfile).toEqual('/root/dist/apps/nodeapp/main.js');
                        return [2 /*return*/];
                }
            });
        }); });
        describe('when stats json option is passed', function () {
            beforeEach(function () {
                var stats = {
                    stats: 'stats'
                };
                spyOn(builder.webpackBuilder, 'runWebpack').and.callFake(function (opts, cb) {
                    cb({
                        toJson: function () { return stats; },
                        toString: function () { return JSON.stringify(stats); }
                    });
                    return rxjs_1.of({
                        success: true
                    });
                });
                spyOn(fs, 'writeFileSync');
            });
            it('should generate a stats json', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, builder
                                .run({
                                root: core_1.normalize('/root'),
                                projectType: 'application',
                                builder: '@nrwl/builders:node-build',
                                options: __assign({}, testOptions, { statsJson: true })
                            })
                                .toPromise()];
                        case 1:
                            _a.sent();
                            expect(fs.writeFileSync).toHaveBeenCalledWith('/root/dist/apps/nodeapp/stats.json', JSON.stringify({
                                stats: 'stats'
                            }, null, 2));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('options normalization', function () {
        it('should add the root', function () {
            var result = builder.normalizeOptions(testOptions, sourceRoot);
            expect(result.root).toEqual('/root');
        });
        it('should resolve main from root', function () {
            var result = builder.normalizeOptions(testOptions, sourceRoot);
            expect(result.main).toEqual('/root/apps/nodeapp/src/main.ts');
        });
        it('should resolve the output path', function () {
            var result = builder.normalizeOptions(testOptions, sourceRoot);
            expect(result.outputPath).toEqual('/root/dist/apps/nodeapp');
        });
        it('should resolve the tsConfig path', function () {
            var result = builder.normalizeOptions(testOptions, sourceRoot);
            expect(result.tsConfig).toEqual('/root/apps/nodeapp/tsconfig.app.json');
        });
        it('should normalize asset patterns', function () {
            spyOn(fs, 'statSync').and.returnValue({
                isDirectory: function () { return true; }
            });
            var result = builder.normalizeOptions(__assign({}, testOptions, { assets: [
                    'apps/nodeapp/src/assets',
                    {
                        input: '/outsideroot',
                        output: 'output',
                        glob: '**/*',
                        ignore: ['**/*.json']
                    }
                ] }), sourceRoot);
            expect(result.assets).toEqual([
                {
                    input: '/root/apps/nodeapp/src/assets',
                    output: 'assets',
                    glob: '**/*'
                },
                {
                    input: '/outsideroot',
                    output: 'output',
                    glob: '**/*',
                    ignore: ['**/*.json']
                }
            ]);
        });
        it('should resolve the file replacement paths', function () {
            var result = builder.normalizeOptions(testOptions, sourceRoot);
            expect(result.fileReplacements).toEqual([
                {
                    replace: '/root/apps/environment/environment.ts',
                    with: '/root/apps/environment/environment.prod.ts'
                },
                {
                    replace: '/root/module1.ts',
                    with: '/root/module2.ts'
                }
            ]);
        });
    });
});

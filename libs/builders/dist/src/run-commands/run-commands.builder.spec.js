"use strict";
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
var run_commands_builder_1 = require("./run-commands.builder");
var tmp_1 = require("tmp");
var fs_1 = require("fs");
function readFile(f) {
    return fs_1.readFileSync(f)
        .toString()
        .replace(/\s/g, '');
}
describe('Command Runner Builder', function () {
    var builder;
    beforeEach(function () {
        builder = new run_commands_builder_1.default();
    });
    it('should error when no commands are given', function () { return __awaiter(_this, void 0, void 0, function () {
        var root, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = core_1.normalize('/root');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, builder
                            .run({
                            root: root,
                            builder: '@nrwl/run-commands',
                            projectType: 'application',
                            options: {}
                        })
                            .toPromise()];
                case 2:
                    result = _a.sent();
                    fail('should throw');
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    expect(e_1).toEqual("ERROR: Bad builder config for @nrwl/run-command - \"commands\" option is required");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('should error when no command is given', function () { return __awaiter(_this, void 0, void 0, function () {
        var root, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = core_1.normalize('/root');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, builder
                            .run({
                            root: root,
                            builder: '@nrwl/run-commands',
                            projectType: 'application',
                            options: {
                                commands: [{}]
                            }
                        })
                            .toPromise()];
                case 2:
                    result = _a.sent();
                    fail('should throw');
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    expect(e_2).toEqual("ERROR: Bad builder config for @nrwl/run-command - \"command\" option is required");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    describe('no readyCondition', function () {
        it('should run commands serially', function () { return __awaiter(_this, void 0, void 0, function () {
            var root, f, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        root = core_1.normalize('/root');
                        f = tmp_1.fileSync().name;
                        return [4 /*yield*/, builder
                                .run({
                                root: root,
                                builder: '@nrwl/run-commands',
                                projectType: 'application',
                                options: {
                                    commands: [
                                        {
                                            command: "sleep 0.2 && echo 1 >> " + f
                                        },
                                        {
                                            command: "sleep 0.1 && echo 2 >> " + f
                                        }
                                    ],
                                    parallel: false
                                }
                            })
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ success: true });
                        expect(readFile(f)).toEqual('12');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should run commands in parallel', function () { return __awaiter(_this, void 0, void 0, function () {
            var root, f, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        root = core_1.normalize('/root');
                        f = tmp_1.fileSync().name;
                        return [4 /*yield*/, builder
                                .run({
                                root: root,
                                builder: '@nrwl/run-commands',
                                projectType: 'application',
                                options: {
                                    commands: [
                                        {
                                            command: "sleep 0.2 && echo 1 >> " + f
                                        },
                                        {
                                            command: "sleep 0.1 && echo 2 >> " + f
                                        }
                                    ],
                                    parallel: true
                                }
                            })
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ success: true });
                        expect(readFile(f)).toEqual('21');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('readyWhen', function () {
        it('should error when parallel = false', function () { return __awaiter(_this, void 0, void 0, function () {
            var root, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        root = core_1.normalize('/root');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, builder
                                .run({
                                root: root,
                                builder: '@nrwl/run-commands',
                                projectType: 'application',
                                options: {
                                    commands: [{ command: 'some command' }],
                                    parallel: false,
                                    readyWhen: 'READY'
                                }
                            })
                                .toPromise()];
                    case 2:
                        result = _a.sent();
                        fail('should throw');
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(e_3).toEqual("ERROR: Bad builder config for @nrwl/run-command - \"readyWhen\" can only be used when parallel=true");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should return success true when the string specified is ready condition is found', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var root, f, successEmitted;
            return __generator(this, function (_a) {
                root = core_1.normalize('/root');
                f = tmp_1.fileSync().name;
                successEmitted = false;
                builder
                    .run({
                    root: root,
                    builder: '@nrwl/run-commands',
                    projectType: 'application',
                    options: {
                        commands: [
                            {
                                command: "echo READY && sleep 0.1 && echo 1 >> " + f
                            }
                        ],
                        parallel: true,
                        readyWhen: 'READY'
                    }
                })
                    .subscribe(function (result) {
                    successEmitted = true;
                    expect(result).toEqual({ success: true });
                    expect(readFile(f)).toEqual('');
                });
                setTimeout(function () {
                    if (!successEmitted) {
                        fail('Success must be emitted');
                    }
                    expect(readFile(f)).toEqual('1');
                    done();
                }, 150);
                return [2 /*return*/];
            });
        }); });
    });
    it('should stop execution when a command fails', function () { return __awaiter(_this, void 0, void 0, function () {
        var root, f, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    root = core_1.normalize('/root');
                    f = tmp_1.fileSync().name;
                    return [4 /*yield*/, builder
                            .run({
                            root: root,
                            builder: '@nrwl/run-commands',
                            projectType: 'application',
                            options: {
                                commands: [
                                    {
                                        command: "echo 1 >> " + f + " && exit 1"
                                    },
                                    {
                                        command: "echo 2 >> " + f
                                    }
                                ]
                            }
                        })
                            .toPromise()];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({ success: false });
                    expect(readFile(f)).toEqual('1');
                    return [2 /*return*/];
            }
        });
    }); });
});

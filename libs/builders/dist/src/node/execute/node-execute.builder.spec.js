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
var node_execute_builder_1 = require("./node-execute.builder");
var testing_1 = require("@angular-devkit/architect/testing");
var core_1 = require("@angular-devkit/core");
var rxjs_1 = require("rxjs");
var jasmine_marbles_1 = require("jasmine-marbles");
jest.mock('child_process');
var fork = require('child_process').fork;
jest.mock('tree-kill');
var treeKill = require('tree-kill');
var MockArchitect = /** @class */ (function () {
    function MockArchitect() {
    }
    MockArchitect.prototype.getBuilderConfiguration = function () {
        return {
            config: 'testConfig'
        };
    };
    MockArchitect.prototype.run = function () {
        return jasmine_marbles_1.cold('--a--b--a', {
            a: {
                success: true,
                outfile: 'outfile.js'
            },
            b: {
                success: false,
                outfile: 'outfile.js'
            }
        });
    };
    MockArchitect.prototype.getBuilderDescription = function () {
        return rxjs_1.of({
            description: 'testDescription'
        });
    };
    MockArchitect.prototype.validateBuilderOptions = function () {
        return rxjs_1.of({
            options: {}
        });
    };
    return MockArchitect;
}());
describe('NodeExecuteBuilder', function () {
    var builder;
    var architect;
    var logger;
    var testOptions;
    beforeEach(function () {
        fork.mockReturnValue({
            pid: 123
        });
        treeKill.mockImplementation(function (pid, signal, callback) {
            callback();
        });
        logger = new testing_1.TestLogger('test');
        architect = new MockArchitect();
        builder = new node_execute_builder_1.NodeExecuteBuilder({
            workspace: {
                root: '/root'
            },
            logger: logger,
            host: {},
            architect: architect
        });
        testOptions = {
            inspect: true,
            args: [],
            buildTarget: 'nodeapp:build',
            port: 9229,
            waitUntilTargets: []
        };
    });
    it('should build the application and start the built file', function () {
        var getBuilderConfiguration = spyOn(architect, 'getBuilderConfiguration').and.callThrough();
        expect(builder.run({
            root: core_1.normalize('/root'),
            projectType: 'application',
            builder: '@nrwl/builders:node-execute',
            options: testOptions
        })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
            a: {
                success: true,
                outfile: 'outfile.js'
            },
            b: {
                success: false,
                outfile: 'outfile.js'
            }
        }));
        expect(getBuilderConfiguration).toHaveBeenCalledWith({
            project: 'nodeapp',
            target: 'build',
            overrides: {
                watch: true
            }
        });
        expect(fork).toHaveBeenCalledWith('outfile.js', [], {
            execArgv: ['--inspect=localhost:9229']
        });
        expect(treeKill).toHaveBeenCalledTimes(1);
        expect(fork).toHaveBeenCalledTimes(2);
    });
    describe('--inspect', function () {
        describe('inspect', function () {
            it('should inspect the process', function () {
                expect(builder.run({
                    root: core_1.normalize('/root'),
                    projectType: 'application',
                    builder: '@nrwl/builders:node-execute',
                    options: __assign({}, testOptions, { inspect: "inspect" /* Inspect */ })
                })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
                    a: {
                        success: true,
                        outfile: 'outfile.js'
                    },
                    b: {
                        success: false,
                        outfile: 'outfile.js'
                    }
                }));
                expect(fork).toHaveBeenCalledWith('outfile.js', [], {
                    execArgv: ['--inspect=localhost:9229']
                });
            });
        });
        describe('inspect-brk', function () {
            it('should inspect and break at beginning of execution', function () {
                expect(builder.run({
                    root: core_1.normalize('/root'),
                    projectType: 'application',
                    builder: '@nrwl/builders:node-execute',
                    options: __assign({}, testOptions, { inspect: "inspect-brk" /* InspectBrk */ })
                })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
                    a: {
                        success: true,
                        outfile: 'outfile.js'
                    },
                    b: {
                        success: false,
                        outfile: 'outfile.js'
                    }
                }));
                expect(fork).toHaveBeenCalledWith('outfile.js', [], {
                    execArgv: ['--inspect-brk=localhost:9229']
                });
            });
        });
    });
    describe('--port', function () {
        describe('1234', function () {
            it('should inspect the process on port 1234', function () {
                expect(builder.run({
                    root: core_1.normalize('/root'),
                    projectType: 'application',
                    builder: '@nrwl/builders:node-execute',
                    options: __assign({}, testOptions, { port: 1234 })
                })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
                    a: {
                        success: true,
                        outfile: 'outfile.js'
                    },
                    b: {
                        success: false,
                        outfile: 'outfile.js'
                    }
                }));
                expect(fork).toHaveBeenCalledWith('outfile.js', [], {
                    execArgv: ['--inspect=localhost:1234']
                });
            });
        });
    });
    it('should log errors from killing the process', function () {
        treeKill.mockImplementation(function (pid, signal, callback) {
            callback(new Error('Error Message'));
        });
        var loggerError = spyOn(logger, 'error');
        expect(builder.run({
            root: core_1.normalize('/root'),
            projectType: 'application',
            builder: '@nrwl/builders:node-execute',
            options: testOptions
        })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
            a: {
                success: true,
                outfile: 'outfile.js'
            },
            b: {
                success: false,
                outfile: 'outfile.js'
            }
        }));
        expect(loggerError.calls.argsFor(1)).toEqual(['Error Message']);
    });
    it('should log errors from killing the process on windows', function () {
        treeKill.mockImplementation(function (pid, signal, callback) {
            callback([new Error('error'), '', 'Error Message']);
        });
        var loggerError = spyOn(logger, 'error');
        expect(builder.run({
            root: core_1.normalize('/root'),
            projectType: 'application',
            builder: '@nrwl/builders:node-execute',
            options: testOptions
        })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
            a: {
                success: true,
                outfile: 'outfile.js'
            },
            b: {
                success: false,
                outfile: 'outfile.js'
            }
        }));
        expect(loggerError.calls.argsFor(1)).toEqual(['Error Message']);
    });
    it('should build the application and start the built file with options', function () {
        expect(builder.run({
            root: core_1.normalize('/root'),
            projectType: 'application',
            builder: '@nrwl/builders:node-execute',
            options: __assign({}, testOptions, { inspect: false, args: ['arg1', 'arg2'] })
        })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
            a: {
                success: true,
                outfile: 'outfile.js'
            },
            b: {
                success: false,
                outfile: 'outfile.js'
            }
        }));
        expect(fork).toHaveBeenCalledWith('outfile.js', ['arg1', 'arg2'], {
            execArgv: []
        });
    });
    it('should warn users who try to use it in production', function () {
        spyOn(architect, 'validateBuilderOptions').and.returnValue(rxjs_1.of({
            options: {
                optimization: true
            }
        }));
        spyOn(logger, 'warn');
        expect(builder.run({
            root: core_1.normalize('/root'),
            projectType: 'application',
            builder: '@nrwl/builders:node-execute',
            options: __assign({}, testOptions, { inspect: false, args: ['arg1', 'arg2'] })
        })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
            a: {
                success: true,
                outfile: 'outfile.js'
            },
            b: {
                success: false,
                outfile: 'outfile.js'
            }
        }));
        expect(logger.warn).toHaveBeenCalled();
    });
    describe('waitUntilTasks', function () {
        beforeEach(function () {
            spyOn(architect, 'getBuilderConfiguration').and.callFake(function (opts) {
                if (opts.project === 'project1' && opts.target === 'target1')
                    return { config: 'builderConfig1' };
                if (opts.project === 'project2' && opts.target === 'target2')
                    return { config: 'builderConfig2' };
                return new MockArchitect().getBuilderConfiguration();
            });
            spyOn(architect, 'validateBuilderOptions').and.callFake(function (opts) {
                if (opts.config === 'builderConfig1' ||
                    opts.config === 'builderConfig2')
                    return rxjs_1.of(opts);
                return new MockArchitect().validateBuilderOptions();
            });
        });
        it('should run the tasks before starting the build', function () {
            spyOn(architect, 'run').and.callFake(function (opts) {
                if (opts.config == 'builderConfig1')
                    return rxjs_1.of({ success: true });
                if (opts.config == 'builderConfig2')
                    return rxjs_1.of({ success: true });
                return new MockArchitect().run();
            });
            expect(builder.run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:node-execute',
                options: __assign({}, testOptions, { waitUntilTargets: ['project1:target1', 'project2:target2'] })
            })).toBeObservable(jasmine_marbles_1.cold('--a--b--a', {
                a: {
                    success: true,
                    outfile: 'outfile.js'
                },
                b: {
                    success: false,
                    outfile: 'outfile.js'
                }
            }));
        });
        it('should not run the build if any of the tasks fail', function (done) {
            spyOn(architect, 'run').and.callFake(function (opts) {
                if (opts.config == 'builderConfig1')
                    return rxjs_1.of({ success: true });
                if (opts.config == 'builderConfig2')
                    return rxjs_1.of({ other: true }, { success: false });
                return new MockArchitect().run();
            });
            var loggerError = spyOn(logger, 'error');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:node-execute',
                options: __assign({}, testOptions, { waitUntilTargets: ['project1:target1', 'project2:target2'] })
            })
                .subscribe(function (e) {
                expect(e.success).toEqual(false);
                expect(loggerError).toHaveBeenCalled();
                done();
            });
        });
    });
});

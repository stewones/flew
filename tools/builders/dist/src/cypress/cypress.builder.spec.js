"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cypress_builder_1 = require("./cypress.builder");
var testing_1 = require("@angular-devkit/architect/testing");
var core_1 = require("@angular-devkit/core");
var events_1 = require("events");
var child_process = require("child_process");
var path = require("path");
var fsUtility = require("@angular-devkit/schematics/tools/file-system-utility");
var fsExtras = require("fs-extra");
var Cypress = require('cypress');
describe('Cypress builder', function () {
    var builder;
    var cypressBuilderOptions = {
        cypressConfig: 'apps/my-app-e2e/cypress.json',
        tsConfig: 'apps/my-app-e2e/tsconfig.json',
        devServerTarget: 'my-app:serve',
        headless: true,
        record: false,
        baseUrl: undefined,
        watch: false
    };
    beforeEach(function () {
        builder = new cypress_builder_1.default({
            host: {},
            logger: new testing_1.TestLogger('test'),
            workspace: {
                root: '/root'
            },
            architect: {}
        });
    });
    describe('run', function () {
        it('should call `fork.child_process` with the tsc command', function () {
            spyOn(fsUtility, 'readFile').and.returnValue(JSON.stringify({
                compilerOptions: { outDir: '../../dist/out-tsc/apps/my-app-e2e/src' }
            }));
            var fakeEventEmitter = new events_1.EventEmitter();
            var fork = spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: cypressBuilderOptions
            })
                .subscribe(function () {
                expect(fork).toHaveBeenCalledWith('/root/node_modules/.bin/tsc', cypressBuilderOptions.tsConfig, { stdio: [0, 1, 2] });
            });
            fakeEventEmitter.emit('exit');
        });
        it('should call `Cypress.run` if headless mode is `true`', function () {
            spyOn(fsUtility, 'readFile').and.returnValue(JSON.stringify({
                compilerOptions: { outDir: '../../dist/out-tsc/apps/my-app-e2e/src' }
            }));
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            var cypressRun = spyOn(Cypress, 'run');
            var cypressOpen = spyOn(Cypress, 'open');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: cypressBuilderOptions
            })
                .subscribe(function () {
                expect(cypressRun).toHaveBeenCalledWith({
                    config: { baseUrl: 'http://localhost:4200' },
                    project: path.dirname(cypressBuilderOptions.cypressConfig)
                });
                expect(cypressOpen).not.toHaveBeenCalled();
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
        it('should call `Cypress.open` if headless mode is `false`', function () {
            spyOn(fsUtility, 'readFile').and.returnValue(JSON.stringify({
                compilerOptions: { outDir: '../../dist/out-tsc/apps/my-app-e2e/src' }
            }));
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            var cypressRun = spyOn(Cypress, 'run');
            var cypressOpen = spyOn(Cypress, 'open');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: Object.assign(cypressBuilderOptions, { headless: false })
            })
                .subscribe(function () {
                expect(cypressOpen).toHaveBeenCalledWith({
                    config: { baseUrl: 'http://localhost:4200' },
                    project: path.dirname(cypressBuilderOptions.cypressConfig)
                });
                expect(cypressRun).not.toHaveBeenCalled();
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
        it('should call `Cypress.run` with provided baseUrl', function () {
            spyOn(fsUtility, 'readFile').and.returnValue(JSON.stringify({
                compilerOptions: { outDir: '../../dist/out-tsc/apps/my-app-e2e/src' }
            }));
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            var cypressRun = spyOn(Cypress, 'run');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: Object.assign(cypressBuilderOptions, {
                    baseUrl: 'http://my-distant-host.com'
                })
            })
                .subscribe(function () {
                expect(cypressRun).toHaveBeenCalledWith({
                    config: { baseUrl: 'http://my-distant-host.com' },
                    project: path.dirname(cypressBuilderOptions.cypressConfig)
                });
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
        it('should call `Cypress.run` with provided browser', function () {
            spyOn(fsUtility, 'readFile').and.returnValue(JSON.stringify({
                compilerOptions: { outDir: '../../dist/out-tsc/apps/my-app-e2e/src' }
            }));
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            var cypressRun = spyOn(Cypress, 'run');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: Object.assign(cypressBuilderOptions, {
                    browser: 'chrome'
                })
            })
                .subscribe(function () {
                expect(cypressRun).toHaveBeenCalledWith({
                    config: { browser: 'chrome' },
                    project: path.dirname(cypressBuilderOptions.cypressConfig)
                });
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
        it('should call `Cypress.run` without baseUrl nor dev server target value', function () {
            spyOn(fsUtility, 'readFile').and.returnValue(JSON.stringify({
                compilerOptions: { outDir: '../../dist/out-tsc/apps/my-app-e2e/src' }
            }));
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            var cypressRun = spyOn(Cypress, 'run');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: {
                    cypressConfig: 'apps/my-app-e2e/cypress.json',
                    tsConfig: 'apps/my-app-e2e/tsconfig.json',
                    devServerTarget: undefined,
                    headless: true,
                    record: false,
                    baseUrl: undefined,
                    watch: false
                }
            })
                .subscribe(function () {
                expect(cypressRun).toHaveBeenCalledWith({
                    project: path.dirname(cypressBuilderOptions.cypressConfig)
                });
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
        it('should copy fixtures folder to out-dir', function () {
            spyOn(fsUtility, 'readFile').and.callFake(function (path) {
                return path.endsWith('tsconfig.e2e.json')
                    ? JSON.stringify({
                        compilerOptions: {
                            outDir: '../../dist/out-tsc/apps/my-app-e2e/src'
                        }
                    })
                    : JSON.stringify({
                        fixturesFolder: '../../dist/out-tsc/apps/my-app-e2e/src/fixtures'
                    });
            });
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            spyOn(Cypress, 'run');
            spyOn(fsExtras, 'copySync');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: {
                    cypressConfig: 'apps/my-app-e2e/cypress.json',
                    tsConfig: 'apps/my-app-e2e/tsconfig.e2e.json',
                    devServerTarget: undefined,
                    headless: true,
                    record: false,
                    baseUrl: undefined,
                    watch: false
                }
            })
                .subscribe(function () {
                expect(fsExtras.copySync).toHaveBeenCalledWith('apps/my-app-e2e/src/fixtures', 'dist/out-tsc/my-app-e2e/src/fixtures');
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
        it('should not copy fixtures folder if they are not defined in the cypress config', function () {
            spyOn(fsUtility, 'readFile').and.callFake(function (path) {
                return path.endsWith('tsconfig.e2e.json')
                    ? JSON.stringify({
                        compilerOptions: {
                            outDir: '../../dist/out-tsc/apps/my-app-e2e/src'
                        }
                    })
                    : JSON.stringify({});
            });
            var fakeEventEmitter = new events_1.EventEmitter();
            spyOn(child_process, 'fork').and.returnValue(fakeEventEmitter);
            spyOn(Cypress, 'run');
            spyOn(fsExtras, 'copySync');
            builder
                .run({
                root: core_1.normalize('/root'),
                projectType: 'application',
                builder: '@nrwl/builders:cypress',
                options: {
                    cypressConfig: 'apps/my-app-e2e/cypress.json',
                    tsConfig: 'apps/my-app-e2e/tsconfig.e2e.json',
                    devServerTarget: undefined,
                    headless: true,
                    record: false,
                    baseUrl: undefined,
                    watch: false
                }
            })
                .subscribe(function () {
                expect(fsExtras.copySync).not.toHaveBeenCalled();
            });
            fakeEventEmitter.emit('exit'); // Passing tsc command
        });
    });
});

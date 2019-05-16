import { Builder, BuildEvent, BuilderConfiguration } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
export interface JestBuilderOptions {
    jestConfig: string;
    tsConfig: string;
    watch: boolean;
    bail?: boolean;
    ci?: boolean;
    codeCoverage?: boolean;
    onlyChanged?: boolean;
    maxWorkers?: number;
    passWithNoTests?: boolean;
    runInBand?: boolean;
    setupFile?: string;
    silent?: boolean;
    updateSnapshot?: boolean;
    testNamePattern?: string;
}
export default class JestBuilder implements Builder<JestBuilderOptions> {
    run(builderConfig: BuilderConfiguration<JestBuilderOptions>): Observable<BuildEvent>;
}

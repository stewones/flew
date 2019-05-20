import { Builder, BuilderConfiguration, BuildEvent } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
export interface RunCommandsBuilderOptions {
    commands: {
        command: string;
    }[];
    parallel?: boolean;
    readyWhen?: string;
}
export default class RunCommandsBuilder implements Builder<RunCommandsBuilderOptions> {
    run(config: BuilderConfiguration<RunCommandsBuilderOptions>): Observable<BuildEvent>;
    private runInParallel;
    private runSerially;
    private createProcess;
}

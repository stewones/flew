import { BuildEvent, Builder, BuilderConfiguration, BuilderContext } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
export declare const enum InspectType {
    Inspect = "inspect",
    InspectBrk = "inspect-brk"
}
export interface NodeExecuteBuilderOptions {
    inspect: boolean | InspectType;
    args: string[];
    waitUntilTargets: string[];
    buildTarget: string;
    port: number;
}
export declare class NodeExecuteBuilder implements Builder<NodeExecuteBuilderOptions> {
    private context;
    private subProcess;
    constructor(context: BuilderContext);
    run(target: BuilderConfiguration<NodeExecuteBuilderOptions>): Observable<BuildEvent>;
    private runProcess;
    private getExecArgv;
    private restartProcess;
    private killProcess;
    private startBuild;
    private getBuildBuilderConfig;
    private runWaitUntilTargets;
}
export default NodeExecuteBuilder;

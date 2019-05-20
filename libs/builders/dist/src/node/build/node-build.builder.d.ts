import { Builder, BuildEvent, BuilderConfiguration, BuilderContext } from '@angular-devkit/architect';
import { WebpackBuilder } from '@angular-devkit/build-webpack';
import { Observable } from 'rxjs';
import { AssetPattern } from '@angular-devkit/build-angular';
export interface BuildNodeBuilderOptions {
    main: string;
    outputPath: string;
    tsConfig: string;
    watch?: boolean;
    sourceMap?: boolean;
    optimization?: boolean;
    externalDependencies: 'all' | 'none' | string[];
    showCircularDependencies?: boolean;
    maxWorkers?: number;
    fileReplacements: FileReplacement[];
    assets?: AssetPattern[];
    progress?: boolean;
    statsJson?: boolean;
    extractLicenses?: boolean;
    root?: string;
}
export interface FileReplacement {
    replace: string;
    with: string;
}
export interface NodeBuildEvent extends BuildEvent {
    outfile: string;
}
export default class BuildNodeBuilder implements Builder<BuildNodeBuilderOptions> {
    private context;
    webpackBuilder: WebpackBuilder;
    root: string;
    constructor(context: BuilderContext);
    run(builderConfig: BuilderConfiguration<BuildNodeBuilderOptions>): Observable<NodeBuildEvent>;
    private normalizeOptions;
    private normalizeAssets;
    private normalizeFileReplacements;
}

import { Builder, BuilderConfiguration, BuilderContext, BuildEvent } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
export interface CypressBuilderOptions {
    baseUrl: string;
    cypressConfig: string;
    devServerTarget: string;
    headless: boolean;
    record: boolean;
    tsConfig: string;
    watch: boolean;
    browser?: string;
}
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
export default class CypressBuilder implements Builder<CypressBuilderOptions> {
    context: BuilderContext;
    private computedCypressBaseUrl;
    private tscProcess;
    constructor(context: BuilderContext);
    /**
     * @whatItDoes This is the starting point of the builder.
     * @param builderConfig
     */
    run(builderConfig: BuilderConfiguration<CypressBuilderOptions>): Observable<BuildEvent>;
    /**
     * @whatItDoes Compile typescript spec files to be able to run Cypress.
     * The compilation is done via executing the `tsc` command line/
     * @param tsConfigPath
     * @param isWatching
     */
    private compileTypescriptFiles;
    /**
     * @whatItDoes Copy all the fixtures into the dist folder.
     * This is done because `tsc` doesn't handle `json` files.
     * @param tsConfigPath
     */
    private copyCypressFixtures;
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
    private initCypress;
    /**
     * @whatItDoes Compile the application using the webpack builder.
     * @param devServerTarget
     * @param isWatching
     * @private
     */
    private startDevServer;
    private killProcess;
}

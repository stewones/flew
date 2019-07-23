import {
  Rule,
  SchematicsException,
  Tree,
  apply,
  url,
  filter,
  noop,
  applyTemplates,
  move,
  chain,
  mergeWith
} from '@angular-devkit/schematics';
import {
  parseName,
  getProject,
  buildDefaultPath,
  applyLintFix
} from './ng.utils';
import { strings } from '@angular-devkit/core';

export function createFactory() {
  return function(schema: any): Rule {
    return (host: Tree) => {
      if (!schema.project) {
        throw new SchematicsException('Option (project) is required.');
      }

      const project = getProject(host, schema.project);

      if (schema.path === undefined) {
        schema.path = buildDefaultPath(project);
      }

      const parsedPath = parseName(schema.path, schema.name);
      schema.name = parsedPath.name;
      schema.path = parsedPath.path;

      // todo remove these when we remove the deprecations
      schema.skipTests = schema.skipTests || !schema.spec;

      const templateSource = apply(url('./files'), [
        schema.skipTests
          ? filter(path => !path.endsWith('.spec.ts.template'))
          : noop(),
        applyTemplates({
          ...strings,
          'if-flat': (s: string) => (schema.flat ? '' : s),
          ...schema
        }),
        move(parsedPath.path)
      ]);

      return chain([
        mergeWith(templateSource),
        schema.lintFix ? applyLintFix(schema.path) : noop()
      ]);

      // return chain([
      //   externalSchematic('@schematics/angular', 'service', {
      //     project: schema.project,
      //     name: schema.name,
      //     path: path.join('apps', schema.project, 'src', 'app'),
      //     flat: schema.flat,
      //     spec: schema.spec,
      //     skipTest: schema.skipTests,
      //     lintFix: schema.lintFix
      //   })
      // ]);
    };
  };
}

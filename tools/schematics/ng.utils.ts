import { ProjectType, WorkspaceSchema, WorkspaceProject } from './ng';
import {
  JsonParseMode,
  parseJson,
  Path,
  basename,
  dirname,
  join,
  normalize
} from '@angular-devkit/core';

import {
  DirEntry,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

export function applyLintFix(path = '/'): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Find the closest tslint.json or tslint.yaml
    let dir: DirEntry | null = tree.getDir(
      path.substr(0, path.lastIndexOf('/'))
    );

    do {
      if (
        (dir.subfiles as string[]).some(
          f => f === 'tslint.json' || f === 'tslint.yaml'
        )
      ) {
        break;
      }

      dir = dir.parent;
    } while (dir !== null);

    if (dir === null) {
      throw new SchematicsException(
        'Asked to run lint fixes, but could not find a tslint.json or tslint.yaml config file.'
      );
    }

    // Only include files that have been touched.
    const files: any = tree.actions.reduce((acc: Set<string>, action) => {
      const path = action.path.substr(1); // Remove the starting '/'.
      if (path.endsWith('.ts') && dir && action.path.startsWith(dir.path)) {
        acc.add(path);
      }

      return acc;
    }, new Set<string>());

    context.addTask(
      new TslintFixTask({
        ignoreErrors: true,
        tsConfigPath: 'tsconfig.json',
        files: [...files]
      })
    );
  };
}

export interface Location {
  name: string;
  path: Path;
}

export function parseName(path: string, name: string): Location {
  const nameWithoutPath = basename(normalize(name));
  const namePath = dirname(join(normalize(path), name) as Path);

  return {
    name: nameWithoutPath,
    path: normalize('/' + namePath)
  };
}

export function getProject<
  TProjectType extends ProjectType = ProjectType.Application
>(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string
): WorkspaceProject<TProjectType> {
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost);

  return workspace.projects[projectName] as WorkspaceProject<TProjectType>;
}

// TODO(hans): change this any to unknown when google3 supports TypeScript 3.0.
// tslint:disable-next-line:no-any
export function isWorkspaceSchema(
  workspace: any
): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}

// TODO(hans): change this any to unknown when google3 supports TypeScript 3.0.
// tslint:disable-next-line:no-any
export function isWorkspaceProject(project: any): project is WorkspaceProject {
  return !!(project && (project as WorkspaceProject).projectType);
}

export function getWorkspace(host: Tree): WorkspaceSchema {
  const path = getWorkspacePath(host);
  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }
  const content = configBuffer.toString();

  return (parseJson(content, JsonParseMode.Loose) as {}) as WorkspaceSchema;
}

export function getWorkspacePath(host: Tree): string {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  const path = possibleFiles.filter(path => host.exists(path))[0];

  return path;
}

export function buildDefaultPath(project: WorkspaceProject): string {
  const root = project.sourceRoot
    ? `/${project.sourceRoot}/`
    : `/${project.root}/src/`;

  const projectDirName =
    project.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

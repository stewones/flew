const fs = require('fs');
const chalk = require('chalk');
const { inc } = require('semver');
const { spawnAsync } = require('./spawnAsync');
const { version } = require('../package.json');

const newVersion = inc(version, 'patch');

fs.writeFile(
  '../packages/core/src/version.ts',
  `export const FL_VERSION = '${newVersion}';`,
  {},
  async err => {
    if (err) {
      console.error(chalk.red(err));
      process.exit(1);
    }
    const invocations = [
      ['npm', 'run', 'bump:patch:cache'],
      ['npm', 'run', 'bump:patch:core'],
      ['npm', 'run', 'bump:patch:firebase'],
      ['npm', 'run', 'bump:patch:network'],
      ['npm', 'run', 'bump:patch:parse'],
      ['npm', 'run', 'bump:patch:state'],
      ['npm', 'run', 'publish:cache'],
      ['npm', 'run', 'publish:core'],
      ['npm', 'run', 'publish:firebase'],
      ['npm', 'run', 'publish:network'],
      ['npm', 'run', 'publish:parse'],
      ['npm', 'run', 'publish:state'],
      [
        'cd',
        '..',
        '&&',
        'git',
        'commit',
        '-a',
        '-m',
        `chore: bump libs to ${newVersion}`,
      ],
      [
        'cd',
        '..',
        '&&',
        'npm',
        'version',
        'patch',
        '-m',
        `chore: bump version to ${newVersion}`,
      ],

      [
        'cd',
        '..',
        '&&',
        'git',
        'push',
        '--follow-tags',
        '--set-upstream',
        'origin',
        'master',
      ],
    ];
    for (const [program, ...args] of invocations) {
      await spawnAsync(program, args, {
        stdio: 'inherit',
      });
    }

    console.log(chalk.green(`patch applied ${newVersion}`));
  },
);

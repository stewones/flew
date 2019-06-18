import { LIBS } from './libs';
import * as shell from 'shelljs';

LIBS.map(libName => {
  shell.exec(`../../node_modules/.bin/rimraf ./.build/${libName}`);
  shell.exec(`mkdir ./.build/${libName}`);
  shell.exec(
    `rsync -a --exclude 'apps' --exclude 'extra' --exclude 'ios' --exclude 'android' --exclude 'tools' --exclude 'node_modules' --exclude '.build' --exclude 'coverage' --exclude 'dist' ../../ ./.build/${libName}`
  );
  shell.exec(`cp -rf ./readme/${libName}.md ./.build/${libName}/README.md`);
  shell.exec(`cp -rf ../../libs/${libName}/.travis.yml ./.build/${libName}`);
  shell.exec(
    `cd ./.build/${libName} && git add -A && git commit --amend --no-edit && git push test-${libName} master --force`
  );
});

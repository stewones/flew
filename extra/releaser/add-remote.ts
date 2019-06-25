import { LIBS } from './libs';
import * as shell from 'shelljs';
shell.exec(`cd ../../`);
LIBS.map(libName => {
  shell.exec(`git remote remove test-${libName} || true`);
  shell.exec(
    `git remote add test-${libName} git@gitlab.com:firetask/test-${libName}.git || true`
  );
});

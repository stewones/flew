import { LIBS } from './libs';
import * as shell from 'shelljs';

LIBS.map(libName => {
  shell.exec(
    `cp -rf ../libs/${libName}/package.json ../../dist/libs/${libName}`
  );
});

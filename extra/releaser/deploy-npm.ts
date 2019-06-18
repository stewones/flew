import { LIBS } from './libs';
import * as shell from 'shelljs';

LIBS.map(libName => {
  shell.exec(`cd ../../dist/libs/${libName} && npm publish`);
});

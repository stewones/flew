import { RR_VERSION } from '../../libs/records/src/lib/version';
import * as fs from 'fs';
import { LIBS } from './libs';

export type SemanticTarget = 'major' | 'minor' | 'patch';

export function bumpRR(target: SemanticTarget = 'patch') {
  fs.writeFile(
    '../../libs/records/src/lib/version.ts',
    `export const RR_VERSION = '${bumpNumber(RR_VERSION, target)}';`,
    function(err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log('RR version updated');
    }
  );
}

export function bumpPackage(target: SemanticTarget = 'patch') {
  LIBS.map(libName => {
    fs.readFile(`../../libs/${libName}/package.json`, 'utf8', function(
      err,
      contents
    ) {
      const pkg = JSON.parse(contents);
      pkg.version = bumpNumber(pkg.version, target);
      fs.writeFile(
        `../../libs/${libName}/package.json`,
        JSON.stringify(pkg, null, '\t'),
        function(err) {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          console.log(`${libName} package updated`);
        }
      );
    });
  });
}

export function bumpNumber(num: string, target: SemanticTarget) {
  let major = parseFloat(num.split('.')[0]);
  let minor = parseFloat(num.split('.')[1]);
  let patch = parseFloat(num.split('.')[2]);

  switch (target) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
  }
  return `${major}.${minor}.${patch}`;
}

export function bump(target: SemanticTarget = 'patch') {
  bumpRR(target);
  bumpPackage(target);
}

//
// test
// console.log(bump());

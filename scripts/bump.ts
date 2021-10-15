import { R_VERSION } from '../libs/core/src/lib/version';
import { R_VERSION } from '../projects/libs/core/src/version';
import * as fs from 'fs';
import { LIBS } from './libs';
import * as shell from 'shelljs';

let newVersion = '';

export type SemanticTarget = 'major' | 'minor' | 'patch';

export function bumpRR(target: SemanticTarget = 'patch') {
  newVersion = bumpNumber(R_VERSION, target);
  fs.writeFile(
    '../libs/core/src/lib/version.ts',
export function bumpR(target: SemanticTarget = 'patch') {
  newVersion = bumpNumber(R_VERSION, target);
  fs.writeFile(
    '../projects/libs/core/src/version.ts',
    `export const R_VERSION = '${newVersion}';`,
    function(err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log('RR version updated');
      console.log('version updated');
    }
  );
}

export function bumpPackages(target: SemanticTarget = 'patch') {
  LIBS.map(libName => {
    fs.readFile(`../libs/${libName}/package.json`, 'utf8', function(
    fs.readFile(`../projects/libs/${libName}/package.json`, 'utf8', function(
      err,
      contents
    ) {
      const pkg = JSON.parse(contents);
      pkg.version = bumpNumber(pkg.version, target);
      fs.writeFile(
        `../projects/libs/${libName}/package.json`,
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

export function bumpPackage(target: SemanticTarget = 'patch') {
  LIBS.map(libName => {
    fs.readFile(`../package.json`, 'utf8', function(err, contents) {
      const pkg = JSON.parse(contents);
      pkg.version = bumpNumber(pkg.version, target);
      fs.writeFile(`../package.json`, JSON.stringify(pkg, null, '\t'), function(
        err
      ) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(`${libName} package updated`);
      });
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

export function gitTag() {
  // re-create tag due to standard-version bug
  shell.exec(
    // `cd ../ && git tag -a -f v${R_VERSION} -m "chore(release): ${R_VERSION}"`
    `cd ../ && git tag -a v${R_VERSION} -m "chore(release): ${R_VERSION}"`
  );
  shell.exec(`git commit -am "chore(release): ${R_VERSION}"`);
}

export function bump(target: SemanticTarget = 'patch') {
  bumpR(target);
  bumpPackages(target);
}

//
// test
// console.log(bump());

rimraf ./.build
mkdir ./.build
rsync -a --exclude 'node_modules' --exclude '.build' --exclude 'coverage' --exclude 'dist' ./ ./.build
cp -rf ./tools/bin/readme-rr.md ./.build/README.md
cp -rf ./libs/reactive-record/.travis.yml ./.build
cd ./.build
git add -A
git commit --amend --no-edit
git push origin-rr master --force
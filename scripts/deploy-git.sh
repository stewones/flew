cd ../../
cp -rf ./README.md ./docs
cp -rf ./CHANGELOG.md ./docs
git add -A
git commit --amend --no-edit
git push --follow-tags origin master
cd scripts
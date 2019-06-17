cd ..
git add -A
git commit -am 'chore(core): bump version'
git push origin master
git push origin --tags
cd ./libs
npm run tada
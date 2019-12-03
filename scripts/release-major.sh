# npm run lint:angular
# npm run lint:ionic
# npm run lint:core
# npm run lint:rr
# npm run lint:state
# npm run lint:firebase

# npm run test:angular
# npm run test:ionic
# npm run test:core
# npm run test:rr
# npm run test:state
# npm run test:firebase

# -- BUMP -- ##
npm run bump:major
npm run version:major
npm run changelog
# -- /BUMP -- ##

# -- BUILD -- ##
npm run build:angular
npm run build:cache
npm run build:state
npm run build:firebase
npm run build:core
npm run build:schematics
npm run build:parse
# -- /BUILD -- ##

npm run git:tag
npm run deploy:git
npm run deploy:npm
# npm run deploy:ci
npm run tada
git push origin --tags
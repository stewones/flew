npm run lint:angular
npm run lint:ionic
npm run lint:core
npm run lint:rr
npm run lint:state
npm run lint:firebase

npm run test:angular
npm run test:ionic
npm run test:core
npm run test:rr
npm run test:state
npm run test:firebase

# -- BUILD -- ##
npm run build:angular
npm run build:ionic
npm run build:core
npm run build:rr
npm run build:state
npm run build:firebase
# -- /BUILD -- ##

# -- BUMP -- ##
npm run bump:minor
npm run changelog:minor
# -- /BUMP -- ##

# -- REBUILD -- ##
npm run build:angular
npm run build:ionic
npm run build:core
npm run build:rr
npm run build:state
npm run build:firebase
# -- /REBUILD -- ##

npm run deploy:git
npm run deploy:npm
npm run deploy:ci
npm run tada
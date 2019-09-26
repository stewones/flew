rm -rf ./.deploy
mkdir ./.deploy
mkdir ./.deploy/apps
cp -rf ./apps/firetask ./.deploy/apps
cp -rf ./ios ./.deploy
cp -rf ./libs ./.deploy
cp -rf ./angular.json ./.deploy
cp -rf ./capacitor.config.json ./.deploy
cp -rf ./ionic.config.json ./.deploy
cp -rf ./package.json ./.deploy
cp -rf ./tsconfig.json ./.deploy
cp -rf ./tslint.json ./.deploy
cd ./deploy

git init
git remote add ionic git@git.ionicjs.com:stewan/firetask.git
git commit -am

# cp -rf ./ ./.deploy
#@todo
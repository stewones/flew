ng build core
npm install ./dist/libs/core
ng build cache
npm install ./dist/libs/cache
ng build firebase
npm install ./dist/libs/firebase
ng build parse
npm install ./dist/libs/parse
ng build state
npm install ./dist/libs/state
ng build angular
npm install ./dist/libs/angular

sudo chown -R $USER ./dist/libs/angular
sudo chown -R $USER ./dist/libs/state
sudo chown -R $USER ./dist/libs/parse
sudo chown -R $USER ./dist/libs/firebase
sudo chown -R $USER ./dist/libs/cache
sudo chown -R $USER ./dist/libs/core

sudo chmod +x ./dist/libs/angular
sudo chmod +x ./dist/libs/state
sudo chmod +x ./dist/libs/parse
sudo chmod +x ./dist/libs/firebase
sudo chmod +x ./dist/libs/cache
sudo chmod +x ./dist/libs/core
sudo mkdir ./dist
sudo mkdir ./dist/libs
sudo mkdir ./dist/libs/angular
sudo mkdir ./dist/libs/state
sudo mkdir ./dist/libs/parse
sudo mkdir ./dist/libs/firebase
sudo mkdir ./dist/libs/cache
sudo mkdir ./dist/libs/core

sudo chmod +x ./dist
sudo chmod +x ./dist/libs
sudo chmod +x ./dist/libs/angular
sudo chmod +x ./dist/libs/state
sudo chmod +x ./dist/libs/parse
sudo chmod +x ./dist/libs/firebase
sudo chmod +x ./dist/libs/cache
sudo chmod +x ./dist/libs/core

sudo chown -R $USER ./dist
sudo chown -R $USER ./dist/libs
sudo chown -R $USER ./dist/libs/angular
sudo chown -R $USER ./dist/libs/state
sudo chown -R $USER ./dist/libs/parse
sudo chown -R $USER ./dist/libs/firebase
sudo chown -R $USER ./dist/libs/cache
sudo chown -R $USER ./dist/libs/core

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
#
# 1 - install main shared package
#
ng build core
npm install ./dist/libs/core

#
# 2 - build dependent packages
#

ng build cache
ng build firebase
ng build parse
ng build state

#
# 3 - install secondary shared packages
#

npm install ./dist/libs/cache
npm install ./dist/libs/firebase
npm install ./dist/libs/parse
npm install ./dist/libs/state

ng build angular
# npm install ./dist/libs/angular (not needed)






#
# avoiding
#
# sudo mkdir ./dist
# sudo mkdir ./dist/libs
# sudo mkdir ./dist/libs/angular
# sudo mkdir ./dist/libs/state
# sudo mkdir ./dist/libs/parse
# sudo mkdir ./dist/libs/firebase
# sudo mkdir ./dist/libs/cache
# sudo mkdir ./dist/libs/core

# sudo chmod +x ./dist
# sudo chmod +x ./dist/libs
# sudo chmod +x ./dist/libs/angular
# sudo chmod +x ./dist/libs/state
# sudo chmod +x ./dist/libs/parse
# sudo chmod +x ./dist/libs/firebase
# sudo chmod +x ./dist/libs/cache
# sudo chmod +x ./dist/libs/core

# sudo chown -R $USER ./dist
# sudo chown -R $USER ./dist/libs
# sudo chown -R $USER ./dist/libs/angular
# sudo chown -R $USER ./dist/libs/state
# sudo chown -R $USER ./dist/libs/parse
# sudo chown -R $USER ./dist/libs/firebase
# sudo chown -R $USER ./dist/libs/cache
# sudo chown -R $USER ./dist/libs/core

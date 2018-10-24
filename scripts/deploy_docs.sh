set -e
shopt -s extglob

TEMP_PATH="docs/.vuepress/.temp"

# build docs
npm run docs:build

# prepare deploy
mkdir $TEMP_PATH
cd $TEMP_PATH
git init
git pull git@github.com:PeachScript/vue-infinite-loading.git gh-pages
rm -rf ./!(old) # keep old version docs
cp -r ../dist/* .

# commit and push changes
git add -A
git commit --am -m "deploy documentation"
git push -f git@github.com:PeachScript/vue-infinite-loading.git master:gh-pages

# clean
cd -
rm -rf $TEMP_PATH

#!/usr/bin/env bash
LOCAL_BIN="./node_modules/.bin"

# build client
webpack -p
# NODE_ENV=production $LOCAL_BIN/babel ./src --out-dir ./lib --source-maps inline

# build server
NODE_ENV=production $LOCAL_BIN/babel ./server --out-dir ./dist --source-maps inline
cp ./server/package.json ./dist
pushd ./dist
yarn
rm yarn.lock
popd

#!/usr/bin/env bash

# start developmental environment

# DB_PATH=./db
# DB_PORT=27017
LOCAL_BIN=./node_modules/.bin

# start DB
# [[ -d $DB_PATH ]] && rm -rf $DB_PATH
# mkdir $DB_PATH
# mongod --dbpath="$DB_PATH" --port="$DB_PORT" &
# PS1=$!

# start client developing
if [[ $NODE_ENV != 'prouction' ]]; then
  $LOCAL_BIN/webpack-dev-server --config=./demo/webpack.config.babel.js --progress --colors --hot --inline --watch &
  PS2=$!
fi

# wait mongo start
# COUNTER=0
# COMMAND="db.version()"
# while [[ ! $(mongo --eval $COMMAND) ]]; do
#   if [[ $COUNTER -gt 100 ]]; then
#     # kill all related process
#     kill -9 $PS1
#     kill -9 $PS2
#     echo 'MongoDB not found.'
#     exit 1
#   fi
#   COUNTER=`1 + $COUNTER`
#   sleep 0.1
# done

# migrate
# $LOCAL_BIN/babel-node ./src/server/migrate/index.js

# if [[ $NODE_ENV == 'production' ]]; then
#   PORT=3000
#   # start server as a process
#   PORT=3001 $LOCAL_BIN/forever start "node ./dist/server/index.js"
# else
  # start dev server
  $LOCAL_BIN/nodemon --exec "$LOCAL_BIN/babel-node" -- ./server/index.js
  # kill all related process
  # kill -9 $PS1
  kill -9 $PS2
fi

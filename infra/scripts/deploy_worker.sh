#!/bin/bash

set -e

cd ~/rceEngine

git fetch origin
git reset --hard origin/main

npm ci

pm2 restart brainyalgo_worker
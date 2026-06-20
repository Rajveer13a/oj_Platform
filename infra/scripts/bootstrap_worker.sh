#!/bin/bash

set -e

sudo apt update

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs


curl -fsSL https://get.docker.com | sh

sudo usermod -aG docker ubuntu

sudo docker pull node:20-slim

sudo docker pull python:3.12-slim

sudo npm install -g pm2


git clone https://github.com/Rajveer13a/oj_Platform.git ~/brainyalgo

cd ~/brainyalgo

npm ci

cp ./apps/worker/.env.example ./apps/worker/.env

npx prisma generate --schema=packages/db/prisma/schema.prisma

pm2 start apps/worker/ecosystem.config.cjs

pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu
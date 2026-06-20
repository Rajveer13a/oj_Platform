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


echo ""
echo "Bootstrap complete."
echo "Logout and login again."
echo ""
echo "Then run:"
echo "cd ~/brainyalgo"
echo "npm ci"
echo "npx prisma generate --schema=packages/db/prisma/schema.prisma"
echo "pm2 start apps/worker/ecosystem.config.cjs"
echo "pm2 save"
echo "pm2 startup systemd -u ubuntu --hp /home/ubuntu"
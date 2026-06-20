#!/bin/bash

set -e

sudo apt update

curl -fsSL https://get.docker.com | sh

sudo usermod -aG docker ubuntu

sudo apt install -y nginx

sudo apt install -y certbot python3-certbot-nginx


sudo cp infra/nginx/api_server.conf     /etc/nginx/sites-available/api-server

sudo ln -sf /etc/nginx/sites-available/api_server /etc/nginx/sites-enabled/api_server

sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t

sudo systemctl enable nginx
sudo systemctl restart nginx
#!/bin/bash

set -e

docker pull rajveer13/brainyalgo_api:latest

docker stop api || true
docker rm api || true

docker run -d --name api --restart unless-stopped --env-file ~/env -p 127.0.0.1:4000:4000 rajveer13/brainyalgo_api:latest

docker image prune -f
#!/bin/sh
set -e
exec >> /home/enzo/logs/webhooks/dnd/output.log 2>>/home/enzo/logs/webhooks/dnd/output.log

printf "\n\n"
echo "###### Deploying changes ######"
date +'%Y-%m-%d %H:%M:%S'

cd /home/enzo/dnd-initiative-tracker

echo "------ Git pull ------"
git reset --hard HEAD # Delete all changes mades locally
git fetch --all # Fetch the changes
git pull # Pull the changes

echo "------ Rebuilding and restarting the container ------"
docker compose up --force-recreate --build -d

echo "------ Deleting unused images ------"
docker image prune -f

echo "###### Deployed! ######"

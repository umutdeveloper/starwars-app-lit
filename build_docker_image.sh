#!/bin/bash

IMAGE="starwars-lit-framework:latest"
CONTAINER="starwars-lit"

# Check if the Chrome container does not exist
if [ "$(docker ps -aq -f name=chrome)" ]; then
  docker rm -f chrome
fi
docker run -d --platform linux/amd64  --network host --shm-size="2g" --name chrome selenium/standalone-chrome:latest

# Build the Docker image
docker buildx build --network host -t $IMAGE .

if [ "$(docker ps -aq -f name=$CONTAINER)" ]; then
  docker rm -f $CONTAINER
fi

docker run -d -p 80:80 --name $CONTAINER $IMAGE

docker rm -f chrome
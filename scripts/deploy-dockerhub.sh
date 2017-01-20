#!/bin/bash

set -eo pipefail

source ./scripts/utils.sh

VERSION=$(package_version)

echo "--- Building docker image"
docker build \
  --pull \
  --tag cityofsurrey/cart-inventory-api:${VERSION} \
  .

echo "--- Tagging docker image with version ${VERSION}"
docker tag \
  cityofsurrey/cart-inventory-api:${VERSION} \
  cityofsurrey/cart-inventory-api

echo "--- Pushing docker image to Dockerhub"
docker push cityofsurrey/cart-inventory-api

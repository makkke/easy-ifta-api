#!/bin/bash

set -eo pipefail

docker run \
  --rm \
  --env FORCE_IMAGE_REMOVAL=1 \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume /etc:/etc \
  spotify/docker-gc

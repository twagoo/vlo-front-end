#!/bin/bash
IMAGE="vlo-node:latest"

if ! docker images -q "${IMAGE}"|egrep '.*' > /dev/null; then
	echo "Image '${IMAGE}' not found. Need to build first?"
	exit 1
fi

SCRIPT_DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
docker run -ti --rm -v "${PWD}:${PWD}" -w "${PWD}" "${IMAGE}" "$@"

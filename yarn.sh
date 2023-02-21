#!/bin/bash
IMAGE='vlo-node:latest'
CONTAINER_NAME="${CONTAINER_NAME=vlo-yarn}"
ENTRYPOINT="${ENTRYPOINT:-yarn}"
PORT_MAPPING="${PORT_MAPPING:-3000:3000}"

if ! docker images -q "${IMAGE}"|egrep '.*' > /dev/null; then
	echo "Image '${IMAGE}' not found. Need to build first?"
	exit 1
fi

docker run -ti --rm \
	--name "${CONTAINER_NAME}" \
	-v "vlo-node-yarn-cache:/usr/local/share/.cache/yarn" \
	-v "${PWD}:${PWD}" \
	-w "${PWD}" \
	-p "${PORT_MAPPING}" \
	--entrypoint "${ENTRYPOINT}" \
	"${IMAGE}" "$@"

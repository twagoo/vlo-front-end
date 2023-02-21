#!/bin/bash
export PORT_MAPPING="${LOCAL_PORT:-3000}:3000"
export CONTAINER_NAME="${CONTAINER_NAME:-vlo-front-end-dev}"
(
	cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")"
	bash yarn.sh dev
)

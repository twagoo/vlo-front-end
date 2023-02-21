#!/bin/bash
NAME="vlo-node"
VERSION="latest"
TAG="${NAME}:${VERSION}"

SCRIPT_DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
echo "Building ${TAG} in ${SCRIPT_DIR}"
docker build --tag "${TAG}" "$SCRIPT_DIR"

FROM registry.gitlab.com/clarin-eric/docker-alpine-base:2.2.8

ARG YARN_VERSION=1.22.17-r0

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apk add --no-cache "yarn=$YARN_VERSION"

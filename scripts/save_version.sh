#!/bin/sh
echo "Saving current git commit hash to version.txt"
echo "$(git rev-parse HEAD) - $(date -u +"%Y-%m-%d %H:%M:%S UTC") - $(git log -1 --pretty=%s)" > version.txt
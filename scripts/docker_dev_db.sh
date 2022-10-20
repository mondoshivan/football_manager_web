#!/usr/bin/env bash

SCRIPTS_DIR=$(dirname "$0")

# check env
source ${SCRIPTS_DIR}/env_check.sh

# stop containers
docker stop fm_dev_db
docker stop fm-phpmyadmin

# make sure to be in the project root
cd $(dirname "$0")/..

# run db
docker run -d --name fm_dev_db \
    -e MARIADB_ROOT_PASSWORD="${FM_DB_ROOT_PASSWORD}" \
    -e MARIADB_USER="${FM_DB_USER}" \
    -e MARIADB_PASSWORD="${FM_DB_PASSWORD}" \
    -e MARIADB_DATABASE="${FM_DB_NAME}" \
    -p 3307:3306 \
    -v ${PWD}/db/dev/mysqlconf:/etc/mysql/conf.d:delegated \
    -v ${PWD}/db/dev/initialize:/docker-entrypoint-initdb.d:delegated \
    --rm \
    mariadb:latest

# run phpmyadmin
docker run -d --name fm-phpmyadmin \
    -p 9001:80 \
    --link fm_dev_db:db \
    --rm \
    phpmyadmin
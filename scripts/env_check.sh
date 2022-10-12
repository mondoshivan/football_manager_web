#!/usr/bin/env bash

if [ -z "${FM_DB_ROOT_PASSWORD}" ]; then
    echo "Error: FM_DB_ROOT_PASSWORD not set"
    exit 1
fi

if [ -z "${FM_DB_USER}" ]; then
    echo "Error: FM_DB_USER not set"
    exit 1
fi

if [ -z "${FM_DB_PASSWORD}" ]; then
    echo "Error: FM_DB_PASSWORD not set"
    exit 1
fi

if [ -z "${FM_DB_NAME}" ]; then
    echo "Error: FM_DB_NAME not set"
    exit 1
fi

#!/usr/bin/env bash

set -euxo pipefail

SRC='./submodules/trezor-common/tools'
DIST='./packages/connect-common/files'

# todo:
# if [ $# -ge 1 ] && [ "$1" == "local" ]
#     then
#         SRC='../trezor-firmware/common/tools'
# fi

# BUILD coins.json using trezor-common cointool
# exclude unused fields
$SRC/cointool.py dump -p -o $DIST/coins.json \
    -e blockbook \
    -e icon \
    -e cooldown \
    -e github \
    -e key \
    -e maintainer \
    -e uri_prefix \
    -e version_group_id \
    -e website \
    -e links \
    -e duplicate \
    -e wallet \
    -e bitcore \
    -e confidential_assets \
    -e negative_fee \
    -E eth \
    -E erc20 \

# Exclude coins that are not supported by any device model
yarn tsx "$(dirname "${BASH_SOURCE[0]}")"/filterCoins.ts

yarn prettier --write $DIST/coins.json

$SRC/cointool.py dump -p -o $DIST/coins-eth.json \
    -e blockbook \
    -e icon \
    -e cooldown \
    -e github \
    -e key \
    -e maintainer \
    -e uri_prefix \
    -e version_group_id \
    -e website \
    -e links \
    -e duplicate \
    -e wallet \
    -e bitcore \
    -e confidential_assets \
    -e negative_fee \
    -E erc20 \
    -E bitcoin \
    -E misc \
    -E nem \

yarn prettier --write $DIST/coins-eth.json

#!/bin/bash

# set -e making the commands if they were like &&
set -e

go get github.com/tools/godep

echo -e "\nDownloading Go packages:\n"
mkdir -p ./vendor/src/github.com/kataras/iris
git clone https://github.com/kataras/iris.git ./vendor/src/github.com/kataras/iris

#!/bin/bash

echo "\
  export NODE_VERSION=$(\
    curl -sL https://nodejs.org/dist/latest/ |\
    tac |\
    tac |\
    grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' |\
    head -1\
  )" >> /etc/bash.bashrc

source /etc/bash.bashrc

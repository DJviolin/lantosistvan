# Lanti/Node
#
# VERSION               1.0.0

FROM lantosistvan_base:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="Node.js" Vendor="Istvan Lantos" Version="1.0"

RUN apt-get -y update && apt-get -y dist-upgrade \
    && apt-get -y install \
        curl

# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

#ENV NPM_CONFIG_LOGLEVEL info
#ENV NODE_VERSION 6.2.2

#RUN curl -SLO "https://nodejs.org/dist/latest/node-v$NODE_VERSION-linux-x64.tar.xz" \
#  && curl -SLO "https://nodejs.org/dist/latest/SHASUMS256.txt.asc" \
#  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
#  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
#  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
#  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

ENV NPM_CONFIG_LOGLEVEL info
# http://stackoverflow.com/a/28879552/1442219
# https://regex101.com/r/eZ1gT7/410
#RUN result=$(( curl -sL "https://nodejs.org/dist/latest/" | tac | tac | grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' | head -1 ) 2>&1) > export NODE_VERSION=$NODE_VERSION
#RUN NODE_VERSION=$(( curl -sL "https://nodejs.org/dist/latest/" | tac | tac | grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' | head -1 ) 2>&1); export NODE_VERSION=$NODE_VERSION
#RUN export NODE_VERSION=$( curl -sL "https://nodejs.org/dist/latest/" | tac | tac | grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' | head -1 )

#RUN /bin/bash -l -c 'echo export NODE_VERSION="$(openssl rand -hex 64)" >> /etc/bash.bashrc'
#RUN echo "export NODE_VERSION=$(    curl -sL https://nodejs.org/dist/latest/ | tac | tac | grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' | head -1    )" >> /etc/bash.bashrc

#RUN echo "\
#  export NODE_VERSION=$(\
#    curl -sL https://nodejs.org/dist/latest/ |\
#    tac |\
#    tac |\
#    grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' |\
#    head -1\
#  )" >> /etc/bash.bashrc
#RUN source /etc/bash.bashrc

RUN export NODE_VERSION=$(\
      curl -sL https://nodejs.org/dist/latest/ |\
      tac |\
      tac |\
      grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' |\
      head -1\
    )
#RUN source /etc/bash.bashrc
# POSIX Standard way
#RUN . /etc/bash.bashrc

RUN echo "Node.js version found: $NODE_VERSION"

RUN curl -SLO "https://nodejs.org/dist/latest/node-v$NODE_VERSION-linux-x64.tar.xz" -o "node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/latest/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

RUN node -v && npm -v

RUN rm -rf /var/lib/apt/lists/*

#CMD ["node"]
CMD ["echo", "lantosistvan_node container finished!"]

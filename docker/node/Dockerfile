FROM lantosistvan_base:1.0.0
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL com.lantosistvan.version="1.0.0" \
      com.lantosistvan.environment="production" \
      com.lantosistvan.description="Node.js"

# http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

ENV NPM_CONFIG_LOGLEVEL="info"

# https://github.com/docker/docker/issues/4032#issuecomment-34597177
# https://github.com/docker/docker/issues/4032#issuecomment-50416589
# https://docs.docker.com/engine/reference/builder/#/arg
RUN buildDeps='\
        ca-certificates \
        curl \
        xz-utils'; \
    apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends --no-install-suggests \
        $buildDeps \
    && rm -rf /var/lib/apt/lists/*; \

    # gpg keys listed at https://github.com/nodejs/node
    for key in \
        9554F04D7259F04124DE6B476D5A82AC7E37093B \
        94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
        0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
        FD3A5288F042B6850C66B31F09FE44734EB7990E \
        71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
        DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
        C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
        B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    ; do \
        gpg --keyserver pool.sks-keyservers.net --recv-keys "$key"; \
    done; \

    NODE_VERSION=$( \
        curl -sL https://nodejs.org/dist/latest/ | \
        tac | \
        tac | \
        grep -oPa -m 1 '(?<=node-v)(.*?)(?=-linux-x64\.tar\.xz)' | \
        head -1 \
    ) \
    && echo $NODE_VERSION \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt; \

    node -v && npm -v \
    #&& mkdir -p /root/www/lantosistvan \

    apt-get purge -y --auto-remove \
        $buildDeps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root/www/lantosistvan

CMD ["echo", "lantosistvan_node container finished!"]

# Lanti/Lwan
#
# VERSION               1.0.0

FROM lantosistvan_base:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="Lwan" Vendor="Istvan Lantos" Version="1.0"

WORKDIR /

RUN apt-get -y update && apt-get -y dist-upgrade \
    && apt-get -y install \
        git \
        cmake \
        zlib1g-dev \
        pkg-config \
        lua5.1-dev \
        libsqlite3-dev \
        libmysqlclient-dev

# Create directory for mountable files, and build lwan
RUN git clone git://github.com/lpereira/lwan && \
    cd lwan && \
    mkdir build && \
    cd build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release && \
    make

WORKDIR /lwan
EXPOSE 80 443 8080
VOLUME ["wwwroot", "/lwan/wwwroot"]

RUN rm -rf /var/lib/apt/lists/*

#ENTRYPOINT ["build/lwan/lwan"]
CMD ["build/lwan/lwan"]

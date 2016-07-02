# Lanti/Base
#
# VERSION               1.0.0

FROM debian:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="This image is the base of the other app images in this project" Vendor="Istvan Lantos" Version="1.0"

ENV TERM linux
ENV DEBIAN_FRONTEND noninteractive
# http://stackoverflow.com/questions/20635472/using-the-run-instruction-in-a-dockerfile-with-source-does-not-work#comment61786875_25423366
# https://wiki.ubuntu.com/DashAsBinSh
#RUN ln -sf /bin/bash /bin/sh && ln -sf /bin/bash /bin/sh.distrib
WORKDIR $HOME

RUN \

echo "\
deb http://httpredir.debian.org/debian stable main contrib non-free\n\
deb-src http://httpredir.debian.org/debian stable main contrib non-free\n\
deb http://security.debian.org stable/updates main contrib non-free\n\
deb-src http://security.debian.org stable/updates main contrib non-free\n\
deb http://httpredir.debian.org/debian stable-updates main contrib non-free\n\
deb-src http://httpredir.debian.org/debian stable-updates main contrib non-free" > /etc/apt/sources.list; \

apt-get -y update && apt-get -y dist-upgrade \
&& apt-get -y install \
    apt-utils \
    locales \
    curl \
    xz-utils; \

### Start of locale
echo "\
LC_ALL=en_US.UTF-8\n\
LANG=en_US.UTF-8\n\
LANGUAGE=en_US.UTF-8" >> /etc/environment; \
locale \
&& locale-gen "en_US.UTF-8" \
&& dpkg-reconfigure locales;
echo "Europe/Budapest" > /etc/timezone \
&& dpkg-reconfigure -f noninteractive tzdata; \
### End of locale

### Start of optimizations
# https://easyengine.io/tutorials/linux/increase-open-files-limit/
echo "\n\
*               hard    nofile            500000\n\
*               soft    nofile            500000\n\
root            hard    nofile            500000\n\
root            soft    nofile            500000" >> /etc/security/limits.conf \
    && echo "session required pam_limits.so" >> /etc/pam.d/common-session \
    && echo "fs.file-max = 2097152" >> /etc/sysctl.conf; \
### End of optimizations

### Start of Nginx WEBSERVER setup
mkdir -p /var/www; \
# Modify www-data user and set UID, GID to 500
# https://muffinresearch.co.uk/linux-changing-uids-and-gids-for-user/
groupmod -g 500 www-data \
&& usermod -u 500 www-data \
#&& `find / -user 33 -exec chown -h 500 {} \;` \
#&& `find / -group 33 -exec chgrp -h 500 {} \;` \
&& usermod -g 500 www-data \
&& chown -R www-data:www-data /var/www \
&& chmod g+s /var/www; \
### End of Nginx WEBSERVER setup

rm -rf /var/lib/apt/lists/*

#CMD ["tail", "-f", "/dev/null"]
CMD ["echo", "lantosistvan_base container finished!"]

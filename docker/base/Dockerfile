# Lanti/Base
#
# VERSION               1.0.0

FROM debian:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="This image is the base of the other app images in this project" Vendor="Istvan Lantos" Version="1.0"
# https://blog.replicated.com/2016/02/05/refactoring-a-dockerfile-for-image-size/

ENV TERM="linux" \
    DEBIAN_FRONTEND="noninteractive"

WORKDIR $HOME

RUN echo "\
deb http://httpredir.debian.org/debian stable main contrib non-free\n\
deb-src http://httpredir.debian.org/debian stable main contrib non-free\n\
deb http://security.debian.org stable/updates main contrib non-free\n\
deb-src http://security.debian.org stable/updates main contrib non-free\n\
deb http://httpredir.debian.org/debian stable-updates main contrib non-free\n\
deb-src http://httpredir.debian.org/debian stable-updates main contrib non-free" > /etc/apt/sources.list; \

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

#CMD ["tail", "-f", "/dev/null"]
CMD ["echo", "lantosistvan_base container finished!"]

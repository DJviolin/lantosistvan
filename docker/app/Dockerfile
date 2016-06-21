# Lanti/App
#
# VERSION               1.0.0

FROM lantosistvan_node:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="App" Vendor="Istvan Lantos" Version="1.0"

# http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

RUN mkdir -p /root/www/lantosistvan
WORKDIR /root/www/lantosistvan

ONBUILD VOLUME ../../app /root/www/lantosistvan
ONBUILD RUN npm install

CMD ["npm", "start"]
#CMD ["DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:*,gulp-live-server:*", "npm", "run", "gulp"]

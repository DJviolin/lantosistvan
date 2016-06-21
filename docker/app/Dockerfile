# Lanti/App
#
# VERSION               1.0.0

FROM lantosistvan_node:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="App" Vendor="Istvan Lantos" Version="1.0"

RUN mkdir -p /root/www/lantosistvan
WORKDIR /root/www/lantosistvan

VOLUME ../../app:/root/www/lantosistvan:rw
RUN npm install

CMD ["npm", "start"]
#CMD ["DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:*,gulp-live-server:*", "npm", "run", "gulp"]

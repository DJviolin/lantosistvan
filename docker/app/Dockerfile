# Lanti/App
#
# VERSION               1.0.0

FROM docker_node:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="App" Vendor="Istvan Lantos" Version="1.0"

RUN mkdir -p $HOME/www/lantosistvan
WORKDIR $HOME/www/lantosistvan

ONBUILD VOLUME ../app:$HOME/www/lantosistvan:rw
ONBUILD RUN npm install

CMD ["npm", "start"]
#CMD ["DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:*,gulp-live-server:*", "npm", "run", "gulp"]

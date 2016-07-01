# lantosistvan

My next personal static photography portfolio website built on Node.js, Express, Handlebars.

## Prerequisites

1. Linux
2. 1GB Ram
3. 20GB disk size (preferably fixed size in virtual machines)
4. Git
5. Docker Client
6. Systemd
7. Docker-compose

## Installation

Basic install script provided. `curl` the following code to your machine and follow the instructions in the script! You doesn't even need to clone this repo (the script will do it anyway), just only download this file to your host:

```
$ curl -H 'Cache-Control: no-cache' -L https://raw.github.com/DJviolin/lantosistvan/master/install.sh > $HOME/install-lantosistvan.sh && chmod +x $HOME/install-lantosistvan.sh && cd $HOME && ./install-lantosistvan.sh && rm -rf $HOME/install-lantosistvan.sh
```

The script will create the `docker/docker-compose.yml`, `docker/lantosistvan.service` and `app/config/mail.js` files inside the cloned repo, which are needed for the stack.

## Usage

Run docker-compose with:

```
$ docker-compose --file $HOME/www/lantosistvan/docker/docker-compose.yml build
```

Start the Systemd service:

```
$ cd $HOME/www/lantosistvan/docker
$ ./service-start.sh
```

Stop the systemd service:

```
$ cd $HOME/www/lantosistvan/docker
$ ./service-stop.sh
```

Running a container for testing:

```
$ docker run --rm -it debian /bin/bash
```

Exec into a running container:

```
$ docker exec -it lantosistvan_app /bin/bash
```

Build an image:

```
$ docker build -t lwan .
$ docker run --rm -it -p 80:8080 lwan /bin/bash
$ docker run --rm -it -p 80:8080 lwan build/lwan/lwan --help
# Serve system-wide documentation:
$ docker run --rm -it -p 80:8080 lwan build/lwan/lwan -r /usr/share/doc
# Start:
$ docker-compose --file $HOME/www/lantosistvan/docker/lwan/docker-compose.yml build
$ docker-compose --file $HOME/www/lantosistvan/docker/lwan/docker-compose.yml up
```

Lwan routing capabilities:

https://github.com/lpereira/lwan/issues/156

https://github.com/adam-hanna/lwan-mustache-c

https://tia.mat.br/posts/2012/11/11/mustache_templates_in_c.html

Change the settings in `app/config.js` if you wish.

## Docker-compose installation on CoreOS

If you happens to be a `CoreOS` user and you want to install `docker-compose`, you can install it with superuser access:

```
$ sudo su
$ mkdir -p /opt/bin
$ curl -L https://github.com/docker/compose/releases/download/1.8.0-rc1/docker-compose-`uname -s`-`uname -m` > /opt/bin/docker-compose
$ chmod +x /opt/bin/docker-compose
$ exit
```

Or without any superuser access, from the nightly release channel:

```
# Removing symlink from /usr/share/skel/.bashrc in cave man style
$ cp $HOME/.bashrc $HOME/.bashrc.new
$ rm $HOME/.bashrc
$ mv $HOME/.bashrc.new $HOME/.bashrc
$ chmod a+x $HOME/.bashrc
# Echoing docker-compose PATH variable
$ echo -e 'export PATH="$PATH:$HOME/bin"' >> $HOME/.bashrc
$ curl -L https://dl.bintray.com/docker-compose/master/docker-compose-`uname -s`-`uname -m` > $HOME/bin/docker-compose
$ chmod +x $HOME/bin/docker-compose
# Reloading .bashrc without opening a new bash instance
$ source $HOME/.bashrc
```

## PUBLIC API

The following routes is exposed by the internal API (requires authentication):

```
GRABS EVERYTHING FROM THE API ROOT (FOR TESTING)
http://127.0.0.1:3000/api/auth/<API-TOKEN>

GRABS EVERY ARTICLES BY LATEST (FOR TESTING)
http://127.0.0.1:3000/api/articles/auth/<API-TOKEN>

GRABS EVERY ARTICLES PER PAGES BY LATEST
http://127.0.0.1:3000/api/articles/page/0/auth/<API-TOKEN>

RETURNS ARTICLE PAGE COUNT
http://127.0.0.1:3000/api/articles/pagecount

GRABS SINGLE ARTICLE BY URL
http://127.0.0.1:3000/api/articles/url/foo/auth/<API-TOKEN>

GRABS ARTICLES BY CATEGORY BY LATEST
http://127.0.0.1:3000/api/articles/page/0/2/order/adddate/auth/<API-TOKEN>

GRABS ARTICLES BY TAGS BY LATEST
http://127.0.0.1:3000/api/articles/tag/foo/auth/<API-TOKEN>

GRABS ARTICLES BY CATEGORIES AND TAGS BY LATEST
http://127.0.0.1:3000/api/articles/category/foo/tag/bar/auth/<API-TOKEN>

GRABS RANDOM URL (FOR TESTING)
http://127.0.0.1:3000/api/articles/random/auth/<API-TOKEN>
```

#### Uncommented files

`./config/mail.js`

```javascript
'use strict';

module.exports = {
  host: 'host-address',
  port: 'port-number',
  user: 'username',
  pass: 'password',
  from: 'username@domain.com',
  to: 'to@domain.com'
};
```

#### Notes

Generated by:

```
express --hbs --git --force .
```

Start the app with:

```
install dependencies:
 > cd . && npm install

run the app on linux:
 > $ DEBUG=lantosistvan-portfolio:*,i18n:* npm start

run the app on windows:
 > SET DEBUG=lantosistvan-portfolio:*,i18n:* & npm start
```

#### Gulp

```
run the app on linux:
 > $ DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:*,gulp-live-server:* npm run gulp

run the app on windows:
 > SET DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:*,gulp-live-server:* & npm run gulp
```

##### TODO

Nginx caching & reverse proxy:

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04

https://www.nginx.com/blog/5-performance-tips-for-node-js-applications/

http://stackoverflow.com/questions/9967887/node-js-itself-or-nginx-frontend-for-serving-static-files

http://expressjs.com/en/advanced/best-practice-performance.html

http://expressjs.com/en/guide/behind-proxies.html

https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/

http://nginx.org/en/docs/http/ngx_http_gzip_module.html

https://serversforhackers.com/nginx-caching

https://www.sitepoint.com/configuring-nginx-ssl-node-js/

https://www.youtube.com/watch?v=FJrs0Ar9asY

http://serverfault.com/questions/601332/how-to-configure-nginx-so-it-works-with-express

Nginx Websocket proxy:

https://www.nginx.com/blog/websocket-nginx/

https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/

http://www.tutorialspoint.com/articles/how-to-configure-nginx-as-reverse-proxy-for-websocket


# Heroku

```
$ heroku login
$ heroku create --ssh-git
https://limitless-beyond-38616.herokuapp.com/ | https://git@heroku.com/limitless-beyond-38616.git
$ git remote -v
$ git push heroku master
$ heroku ps:scale web=1
$ heroku open
$ heroku logs --tail
$ heroku ps
```

# MongoDB

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Installing MongoDB Service and Start:

```
$ "C:\mongodb\bin\mongod.exe" --config "C:\mongodb\mongod.cfg" --install
$ net start MongoDB
```

Accessing MongoDB Shell:

```
$ mongo
```

Removing MongoDB Service and Stop:

```
$ net stop MongoDB
$ "C:\mongodb\bin\mongod.exe" --remove
```

# Notes

Removing all `translate3d` from CSS and JS is needed because of Webkit subpixel rendering drop.

Docker cheatsheet: https://docs.docker.com/engine/reference/commandline/ps/


Command to removing all images and containers:

```shell
#!/bin/bash
# Delete all containers
docker rm -f $(docker ps -a -q)
# Delete all images
docker rmi -f $(docker images -q)
```

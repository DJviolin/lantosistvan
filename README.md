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

Start pm2:

```
$ cd $HOME/www/lantosistvan/app
$ pm2 start ./index.js --name="com.lantosistvan.app" --node-args="--ignition"
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

Getting IP inside container:

```
$ ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
$ curl -4 icanhazip.com
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

## Docker-compose installation on CoreOS

If you happens to be a `CoreOS` user and you want to install `docker-compose`, you can install it with superuser access:

```
$ sudo su
$ mkdir -p /opt/bin
$ curl -L https://github.com/docker/compose/releases/download/1.8.0-rc2/docker-compose-`uname -s`-`uname -m` > /opt/bin/docker-compose
$ chmod +x /opt/bin/docker-compose
$ exit
```

Nightly Channel:

```
$ curl -L https://dl.bintray.com/docker-compose/master/docker-compose-`uname -s`-`uname -m` > /opt/bin/docker-compose
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

## Installed packages

```
$ npm install --save express body-parser cookie-parser compression serve-static method-override morgan debug socket.io express-handlebars glob request request-promise xml2js i18n connect-slashes helmet hpp nodemailer passport jsonwebtoken
$ npm install --save-dev gulpjs/gulp#4.0 gulp-live-server gulp-stylus gulp-clean-css gulp-rename gulp-uglify gulp-download gulp-replace
```

## MongoDB

Start MongoDB:

```
$ "C:\mongodb\bin\mongod.exe" --config "C:\mongodb\mongod.cfg"
$ "C:\mongodb\bin\mongo.exe"
```

Install MongoDB:

```
$ "C:\mongodb\bin\mongod.exe" --config "C:\mongodb\mongod.cfg" --install
$ net start MongoDB
$ mongo
$ help
> db.users.find().pretty()
> db.users.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })
>
> newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" }, { "username" : "testuser3", "email" : "testuser3@testdomain.com" }]
> db.users.insert(newstuff);
$ exit
$ net stop MongoDB
$ "C:\mongodb\bin\mongod.exe" --remove
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

Creating Standalone exe:

http://www.alexjamesbrown.com/blog/development/create-a-standalone-exe-to-run-a-node-js-application/

https://github.com/jxcore/jxcore

Generated by:

```
express --hbs --git --force .
```

Start Nginx:

```
$ cd C:/nginx && nginx -t && nginx
$ curl -I http://127.0.0.1:8080
$ curl --insecure -I https://127.0.0.1:443
```

Creating SSL certificate for Nginx:

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-on-ubuntu-14-04

```
$ openssl req -x509 -nodes -sha256 -days 365 -newkey rsa:2048 -keyout /c/nginx/ssl/nginx.key -out /c/nginx/ssl/nginx.crt
$ openssl dhparam -out /c/nginx/ssl/dhparam.pem 4096
```

Stop Nginx:

```
$ cd C:/nginx && nginx -s stop
```

Speed benchmark:

```
$ time curl -I http://lantosistvan.com
```

Start the app with:

```
install dependencies:
 > cd . && npm install

run the app on linux:
 > $ DEBUG=app:*,i18n:* npm start

run the app on windows:
 > SET DEBUG=app:*,i18n:* & npm start
```

```
$ npm outdated
$ npm update --save
```

#### Gulp

```
run the app on linux:
 > $ DEBUG=app:*,i18n:*,gulp:*,gulp-live-server:* npm run gulp

run the app on windows:
 > SET DEBUG=app:*,i18n:*,gulp:*,gulp-live-server:* & npm run gulp
```

#### Fetch API vs AJAX

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

https://davidwalsh.name/fetch

https://www.sitepoint.com/introduction-to-the-fetch-api/

Polyfill:

https://github.com/github/fetch

https://www.npmjs.com/package/isomorphic-fetch

#### Express listening on res events

listen for the close event on the response object for connection termination before the response could be completely sent.
and you can listen for the finish event for complete transmission of the response.

```
  // connection closed before response could be completely sent
  res.on('close', function () {

  })

  // response sent completely
  res.on('finish', function () {

  })
```

# Notes

Removing all `translate3d` from CSS and JS is needed because of Webkit subpixel rendering drop.

Command to removing all images and containers:

```shell
#!/bin/bash
# Delete all containers
docker rm -f $(docker ps -a -q)
# Delete all images
docker rmi -f $(docker images -q)
# Delete all volumes
docker volume rm $(docker volume ls -q)
# Delete networks
docker network rm docker_lantosistvan_back docker_lantosistvan_front
# Delete docker files
cd /var/lib/docker
rm -rf /var/lib/docker/volumes/
# Delete the orphaned volumes in Docker
docker volume rm $(docker volume ls -qf dangling=true)
# List dangling volumes
docker volume ls -qf dangling=true
# Remove all unused images
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```

Zeroing out free-space:

```
# zero fill before shrinking the partition size!
cat /dev/zero > zero.file; rm zero.file
```

Dockerfile Linter:

http://hadolint.lukasmartinelli.ch/

Dockerfile best practices:

```dockerfile
# https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/
# https://docs.docker.com/engine/reference/builder/#/exec-form-entrypoint-example

# http://stackoverflow.com/questions/20635472/using-the-run-instruction-in-a-dockerfile-with-source-does-not-work#comment61786875_25423366
# https://wiki.ubuntu.com/DashAsBinSh
#RUN ln -sf /bin/bash /bin/sh && ln -sf /bin/bash /bin/sh.distrib
```


Benchmark:

ab, siege, wrk

https://github.com/wg/wrk

https://github.com/JoeDog/siege

http://lionet.livejournal.com/99984.html

http://www.cyberciti.biz/tips/howto-performance-benchmarks-a-web-server.html

https://www.digitalocean.com/community/tutorials/how-to-use-apachebench-to-do-load-testing-on-an-ubuntu-13-10-vps

https://www.digitalocean.com/community/tutorials/how-to-use-apachebench-to-do-load-testing-on-an-arch-linux-vps

```
$ apt-get install apache2-utils
$ ab -n <num_requests> -c <concurrency> <addr>:<port><path>
$ ab -n 1000 -c 100 http://localhost:4567/
$ ab -n 1000 -c 100 http://127.0.0.1/hu
```

http://download.joedog.org/siege/siege-latest.tar.gz

https://github.com/JoeDog/siege

```
$ siege -r5 -c100 -d10 -i http://127.0.0.1/hu
$ siege -r5 -c100 -b http://127.0.0.1/hu
# Real World:
$ siege -c50 -d10 -i http://127.0.0.1/ftp
```

##### Docker related

Minimalistic Docker layers:

https://docs.docker.com/engine/userguide/labels-custom-metadata/

https://blog.replicated.com/2016/02/05/refactoring-a-dockerfile-for-image-size/

Linters:

https://www.fromlatest.io/

http://hadolint.lukasmartinelli.ch/

Tutorials:

https://reactforbeginners.com/

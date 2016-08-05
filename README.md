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

## V8 Experimental features

Strong mode:

https://github.com/v8/v8/wiki/Experiments%20with%20Strengthening%20JavaScript

Webassembly:

```
https://www.npmjs.com/package/wasm
https://github.com/nodejs/NG/issues/19
https://brendaneich.com/2015/06/from-asm-js-to-webassembly/
http://v8project.blogspot.hu/2016/03/experimental-support-for-webassembly.html
https://hacks.mozilla.org/2016/03/a-webassembly-milestone/
https://blogs.windows.com/msedgedev/2016/03/15/previewing-webassembly-experiments/
https://github.com/WebAssembly/design/blob/master/TextFormat.md#official-text-format
https://medium.com/javascript-scene/what-is-webassembly-the-dawn-of-a-new-era-61256ec5a8f6#.5bzwl1ec2
https://medium.com/javascript-scene/why-we-need-webassembly-an-interview-with-brendan-eich-7fb2a60b0723#.gpm5vcbxy
http://llvm.org/docs/doxygen/html/WebAssembly_8h.html
http://moduscreate.com/webassembly-explained/

http://bytearcher.com/articles/run-java-natively-in-browser-with-webassembly/

https://hacks.mozilla.org/2015/12/compiling-to-webassembly-its-happening/

http://www.planetnodejs.com/article/55944c97c18fa30e001b6c53/the-future-of-programming-webassembly-life-after-javascript

https://webassembly.github.io/demo/

# Compiling to JS and ASM.js:
https://www.unrealengine.com/what-is-unreal-engine-4
https://www.reddit.com/r/gamedev/comments/3tnvb2/unrealjs_released_unrealengine_javascript/
https://github.com/ncsoft/Unreal.js

https://unity3d.com/unity/multiplatform
```

https://github.com/webassembly

http://webassembly.github.io/

https://www.w3.org/community/webassembly/

V8 Ignition:

https://github.com/v8/v8/wiki/Interpreter

https://news.ycombinator.com/item?id=10034068

https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44/edit

http://mshockwave.blogspot.hu/2016/03/ignition-interpreter-in-v8-javascript.html

http://v8project.blogspot.hu/

TurboFan & Crankshaft optimization killers:

https://arewefastyet.com/

https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

https://github.com/vhf/v8-bailout-reasons

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

#### Gulp

```
run the app on linux:
 > $ DEBUG=app:*,i18n:*,gulp:*,gulp-live-server:* npm run gulp

run the app on windows:
 > SET DEBUG=app:*,i18n:*,gulp:*,gulp-live-server:* & npm run gulp
```

```
https://nodejs.org/en/docs/es6/

https://github.com/gulpjs/gulp/issues/1571
https://github.com/gulpjs/gulp/blob/4.0/CHANGELOG.md
https://github.com/gulpjs/gulp/tree/4.0/docs/recipes
$ npm info graceful-fs -v
$ npm ls graceful-fs
$ npm info gulp dist-tags

"gulp": ">= 3.9.1",

$ npm install gulpjs/gulp.git#4.0 --save-dev
"devDependencies": { "gulp": "github:gulpjs/gulp#4.0" }

Run the following to check the version of gulp cli that is installed on your machine.
$ gulp -v
If you are not running version 4, do the following to install gulp globally on your machine.
$ npm uninstall -g gulp
$ npm install -g "gulpjs/gulp#4.0"
Now install gulp 4 locally
$ npm uninstall gulp --save-dev
$ npm install "gulpjs/gulp#4.0" --save-dev

$ npm update --no-optional
$ npm install --no-optional
```

##### TODO

https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache-on-one-ubuntu-16-04-server?utm_content=buffer036d0&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer

Docker + Nginx + Reverse Proxy:

https://www.digitalocean.com/community/tutorials/docker-explained-how-to-containerize-and-use-nginx-as-a-proxy

https://developer.atlassian.com/blog/2016/01/docker-cluster-reverse-proxy-1/



nginScript:
https://www.nginx.com/blog/launching-nginscript-and-looking-ahead/



Redirecting URL to localhost:

https://www.namecheap.com/support/knowledgebase/article.aspx/9678/77/how-to-redirect-subdomain-to-a-certain-ip-address-along-with-a-port

Find out my public ip address:

```
$ curl -s checkip.dyndns.org | sed -e 's/.*Current IP Address: //' -e 's/<.*$//'
$ wget http://ipinfo.io/ip -qO -
$ curl ipecho.net/plain ; echo
$ dig +short myip.opendns.com @resolver1.opendns.com
```

Nginx common misconfiguration errors:

https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#root-inside-location-block

Nginx Mail Server:

http://nginx.org/en/docs/mail/ngx_mail_core_module.html

https://www.nginx.com/resources/admin-guide/mail-proxy/

http://blog.siphos.be/2012/12/nginx-as-reverse-smtp-proxy/

http://serverfault.com/a/331547/319692

https://www.digitalocean.com/community/tutorials/how-to-install-and-setup-postfix-on-ubuntu-14-04



Securing Nginx:

https://www.nginx.com/blog/7-tips-for-faster-http2-performance/

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-on-ubuntu-14-04

https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-nginx-for-ubuntu-14-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04

https://community.letsencrypt.org/t/can-i-generate-a-letsencrypt-cert-in-local-host-for-a-domain-i-own/3336/8

https://community.letsencrypt.org/t/can-i-test-lets-encrypt-client-on-localhost/15627/4

https://community.letsencrypt.org/t/certificates-for-hosts-on-private-networks/174/2

https://github.com/letsencrypt/boulder/issues/137

https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04

https://www.nginx.com/blog/nginx-1-9-5/




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

Nginx default build flags:

```
nginx version: nginx/1.11.1
built by gcc 4.9.2 (Debian 4.9.2-10)
built with OpenSSL 1.0.1k 8 Jan 2015 (running with OpenSSL 1.0.1t  3 May 2016)
TLS SNI support enabled
configure arguments:
--prefix=/etc/nginx
--sbin-path=/usr/sbin/nginx
--modules-path=/usr/lib/nginx/modules
--conf-path=/etc/nginx/nginx.conf
--error-log-path=/var/log/nginx/error.log
--http-log-path=/var/log/nginx/access.log
--pid-path=/var/run/nginx.pid
--lock-path=/var/run/nginx.lock
--http-client-body-temp-path=/var/cache/nginx/client_temp
--http-proxy-temp-path=/var/cache/nginx/proxy_temp
--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp
--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp
--http-scgi-temp-path=/var/cache/nginx/scgi_temp
--user=nginx
--group=nginx
--with-http_ssl_module
--with-http_realip_module
--with-http_addition_module
--with-http_sub_module
--with-http_dav_module
--with-http_flv_module
--with-http_mp4_module
--with-http_gunzip_module
--with-http_gzip_static_module
--with-http_random_index_module
--with-http_secure_link_module
--with-http_stub_status_module
--with-http_auth_request_module
--with-http_xslt_module=dynamic
--with-http_image_filter_module=dynamic
--with-http_geoip_module=dynamic
--with-http_perl_module=dynamic
--add-dynamic-module=debian/extra/njs-1c50334fbea6/nginx
--with-threads
--with-stream
--with-stream_ssl_module
--with-http_slice_module
--with-mail
--with-mail_ssl_module
--with-file-aio
--with-ipv6
--with-http_v2_module
--with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2'
--with-ld-opt='-Wl,-z,relro -Wl,--as-needed'
```

##### Docker related

Minimalistic Docker layers:

https://docs.docker.com/engine/userguide/labels-custom-metadata/

https://blog.replicated.com/2016/02/05/refactoring-a-dockerfile-for-image-size/

Linters:

https://www.fromlatest.io/

http://hadolint.lukasmartinelli.ch/




Lwan routing capabilities:

https://github.com/lpereira/lwan/issues/156

https://github.com/adam-hanna/lwan-mustache-c

https://tia.mat.br/posts/2012/11/11/mustache_templates_in_c.html

Change the settings in `app/config.js` if you wish.

Tutorials:

https://reactforbeginners.com/

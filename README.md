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

Basic install script provided. Run only `./install.sh` and follow the instructions in the script! You doesn't even need to clone this repo (the script will do it anyway), just only download this file to your host and run it if you wish!

```
$ curl -L https://raw.github.com/DJviolin/lantosistvan/master/install.sh > $HOME/install-lantosistvan.sh && chmod +x $HOME/install-lantosistvan.sh && cd $HOME && ./install-lantosistvan.sh && rm -rf $HOME/install-lantosistvan.sh
```

The script will create the `docker-compose.yml` and `lantosistvan.service` files inside the cloned repo, which are needed for docker-compose and systemd.

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


## Usage

Change the settings in `./config.js`.

Set Node ENV to production:

```
# /etc/init/env.conf
 env NODE_ENV=production
```

```
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
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

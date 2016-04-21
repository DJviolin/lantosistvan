# lantosistvan

My next personal static photography portfolio website built on Node.js, Express, Handlebars.

## Install

Set Node ENV to production:

```
# /etc/init/env.conf
 env NODE_ENV=production
```

```
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

## Usage

Change the settings in `./config.js`.

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
 > $ DEBUG=i18n:* & npm start

run the app on windows:
 > SET DEBUG=lantosistvan-portfolio:*,i18n:* & npm start
 > SET DEBUG=i18n:* & npm start
```

#### Gulp

run the app on linux:
 > $ DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:* npm run gulp
 > $ DEBUG=i18n:* & npm run gulp

run the app on windows:
 > SET DEBUG=lantosistvan-portfolio:*,i18n:*,gulp:* & npm run gulp
 > SET DEBUG=i18n:* & npm run gulp
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

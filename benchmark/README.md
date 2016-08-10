##### Wgo setup

```shell
wgo init

wgo get github.com/kataras/iris && wgo get github.com/aymerick/raymond && wgo get github.com/iris-contrib/template/handlebars

wgo save

wgo build -o app/main.exe github.com/DJviolin/lantosistvan
```


##### Go/Iris Benchmark

```shell
$ main.exe
$ ab -k -n 1000 -c 10 http://127.0.0.1:8080/
$ ab -k -n 10000 -c 1000 http://127.0.0.1:8080/
$ ab -k -n 1000 -c 10 http://127.0.0.1:8080/hello
$ ab -k -n 100000 -c 1000 http://127.0.0.1:8080/hello
$ wrk -c 64 -d 30s http://127.0.0.1:8080/hello
```

##### Node/Express Benchmark

```shell
$ node --ignition ./app.js
$ ab -k -n 1000 -c 10 http://127.0.0.1:3000/
$ ab -k -n 10000 -c 1000 http://127.0.0.1:3000/
$ ab -k -n 1000 -c 10 http://127.0.0.1:3000/hello
$ ab -k -n 100000 -c 1000 http://127.0.0.1:3000/hello
$ wrk -c 64 -d 30s http://127.0.0.1:3000/hello
```

##### Node/Koa Benchmark

```shell
$ node --harmony ./index
$ ab -k -n 1000 -c 10 http://127.0.0.1:3001/
$ ab -k -n 10000 -c 1000 http://127.0.0.1:3001/
$ ab -k -n 1000 -c 10 http://127.0.0.1:3001/hello
$ ab -k -n 100000 -c 1000 http://127.0.0.1:3001/hello
```

##### Node/Spirit Benchmark

https://medium.com/@hnry/node-js-web-frameworks-are-slow-3b7dfb5e204d#.q2jikor70

https://github.com/spirit-js/spirit

https://github.com/spirit-js/spirit/tree/master/docs/api

https://github.com/spirit-js/spirit-router

https://github.com/spirit-js/spirit-router/blob/master/docs/Guide.md

https://github.com/petkaantonov/bluebird

```shell
$ node --ignition ./index
$ ab -k -n 1000 -c 10 http://127.0.0.1:3030/
$ wrk -c 64 -d 30s http://127.0.0.1:3030/
```

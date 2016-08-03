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
```

##### Node/Express Benchmark

```shell
$ node app.js
$ ab -k -n 1000 -c 10 http://127.0.0.1:3000/
$ ab -k -n 10000 -c 1000 http://127.0.0.1:3000/
$ ab -k -n 1000 -c 10 http://127.0.0.1:3000/hello
$ ab -k -n 100000 -c 1000 http://127.0.0.1:3000/hello
```

##### Node/Koa Benchmark

```shell
$ node --harmony ./index
$ ab -k -n 1000 -c 10 http://127.0.0.1:3001/
$ ab -k -n 10000 -c 1000 http://127.0.0.1:3001/
$ ab -k -n 1000 -c 10 http://127.0.0.1:3001/hello
$ ab -k -n 100000 -c 1000 http://127.0.0.1:3001/hello
```

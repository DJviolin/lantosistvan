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
$ ab -n 1000 -c 100 http://127.0.0.1:8080/
$ ab -n 1000 -c 100 http://127.0.0.1:8080/hello
```

##### Node/Express Benchmark

```shell
$ node app.js
ab -n 1000 -c 100 http://127.0.0.1:3000/
ab -n 1000 -c 100 http://127.0.0.1:3000/hello
```

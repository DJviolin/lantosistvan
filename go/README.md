##### Wgo usage

```shell
cd C:\www\node\lantosistvan\go
wgo init

wgo get github.com/kataras/iris
wgo get github.com/iris-contrib/middleware/logger
wgo get github.com/iris-contrib/middleware/i18n
wgo get github.com/aymerick/raymond
wgo get github.com/iris-contrib/template/handlebars

wgo get -u github.com/kataras/iris
wgo get -u github.com/iris-contrib/middleware/logger
wgo get -u github.com/iris-contrib/middleware/i18n
wgo get -u github.com/aymerick/raymond
wgo get -u github.com/iris-contrib/template/handlebars

wgo save
wgo build -o app/main.exe github.com/DJviolin/lantosistvan
```

##### Express vs Iris benchmark

Completely identical template renderings without any un-needed middlewares

Node/Express:

```shell
GET / 304 70.754 ms - -
GET / 304 19.165 ms - -
GET / 304 13.219 ms - -
GET / 304 11.317 ms - -
GET /my 304 23.417 ms - -
GET /my 304 12.444 ms - -
GET /my 304 12.885 ms - -
GET /my 304 13.628 ms - -
GET /my 304 8.390 ms - -
GET /my 304 10.053 ms - -
GET / 304 19.707 ms - -
GET / 304 8.475 ms - -
GET / 304 16.231 ms - -
GET / 304 8.134 ms - -
GET / 304 8.796 ms - -
```

Go/Iris:

```shell
06/29 - 14:05:09 200 1.0022ms 127.0.0.1 GET /
06/29 - 14:05:33 200   0s 127.0.0.1 GET /
06/29 - 14:05:33 200   0s 127.0.0.1 GET /
06/29 - 14:05:34 200   0s 127.0.0.1 GET /
06/29 - 14:05:43 200   0s 127.0.0.1 GET /my/
06/29 - 14:05:45 200   0s 127.0.0.1 GET /my/
06/29 - 14:05:45 200   0s 127.0.0.1 GET /my/
06/29 - 14:05:46 200   0s 127.0.0.1 GET /my/
06/29 - 14:05:46 200   0s 127.0.0.1 GET /my/
06/29 - 14:05:47 200   0s 127.0.0.1 GET /my/
06/29 - 14:05:48 200 998.6µs 127.0.0.1 GET /
06/29 - 14:05:48 200   0s 127.0.0.1 GET /
06/29 - 14:05:49 200   0s 127.0.0.1 GET /
```

##### Loop in html/template package

http://stackoverflow.com/questions/21302520/golang-iterating-through-map-in-template

```
{{ range $key, $value := . }}
   <li><strong>{{ $key }}</strong>: {{ $value }}</li>
{{ end }}
```

http://stackoverflow.com/questions/28917530/golang-how-to-create-loop-function-using-html-template-package

##### Vendoring

https://nathany.com/go-packages/

https://blog.gopheracademy.com/advent-2015/vendor-folder/

```
Using `go get` or copying dependencies into a `vendor` folder are the approaches endorsed by the Go Team.
```

##### Vendoring in go 1.6

http://stackoverflow.com/questions/35999046/vendoring-in-go-1-6

http://stackoverflow.com/questions/37237036/how-should-i-use-vendor-in-go-1-6

##### Wgo

https://github.com/skelterjohn/wgo

##### GB

https://github.com/constabulary/gb

https://getgb.io/about/

https://getgb.io/docs/project/

https://getgb.io/examples/getting-started/

https://getgb.io/examples/sample-project/

https://getgb.io/docs/depfile/

```shell
$ gb build all
```

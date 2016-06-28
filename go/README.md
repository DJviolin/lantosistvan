##### Wgo usage

```shell
wgo init
wgo get github.com/kataras/iris
wgo get github.com/iris-contrib/middleware/logger
wgo get github.com/aymerick/raymond
wgo save
wgo build -o app/main.exe github.com/DJviolin/lantosistvan
```

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

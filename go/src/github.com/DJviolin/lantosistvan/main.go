package main

import (
	"github.com/kataras/iris"
)

func main() {
	api := iris.New()
	api.Config.Render.Template.Engine = iris.PongoEngine
	api.Get("/hi", hi)
	api.Listen(":8080")
}

// Hi
func hi(ctx *iris.Context) {
	ctx.Write("Hi %s", "iris")
}

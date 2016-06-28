package main

import (
	"github.com/iris-contrib/middleware/logger"
	"github.com/kataras/iris"
)

type mypage struct {
	Message string
}

func irisConfig() {
	// Iris Config
	//api := iris.New()
	iris.Config.Render.Template.Directory = "views"
	iris.Config.Render.Template.Layout = "layouts/main.html" // default ""
	// Iris Logger
	iris.Use(logger.New(iris.Logger))
	// Iris Log http errors
	errorLogger := logger.New(iris.Logger)
	iris.OnError(iris.StatusNotFound, func(ctx *iris.Context) {
		errorLogger.Serve(ctx)
		ctx.Write("My Custom 404 error page")
	})
	/*
	  // These are the defaults
	  templateConfig := config.Template {
	    Engine:        DefaultEngine, //or HTMLTemplate
	    Gzip:          false,
	    IsDevelopment: false,
	    Directory:     "views",
	    Extensions:    []string{".html"},
	    ContentType:   "text/html",
	    Charset:       "UTF-8",
	    Layout:        "layouts/main.html", // currently this is working only on HTML
	    HTMLTemplate:  HTMLTemplate{Left: "{{", Right: "}}", Funcs: template.FuncMap{}},
	    Pongo:         Pongo{Filters: make(map[string]pongo2.FilterFunction, 0),
	                          Globals: make(map[string]interface{}},
	    Markdown:      Markdown{Sanitize: false},
	    Amber:         Amber{Funcs: template.FuncMap{}},
	    Jade:          Jade{},
	  }
	  // Set
	  api.Config.Render.Template = templateConfig
	*/
}

func routes() {
	iris.Get("/hi", hi)
}

func main() {
	irisConfig()
	routes()

	// Server init
	println("Server is running at: 8080")
	iris.Listen(":8080")
}

// Hi
func hi(ctx *iris.Context) {
	//ctx.Write("Hi %s", "iris")
	ctx.MustRender("page1.html", mypage{"Message from page1!"})
}

package main

import (
	"github.com/kataras/iris"
)

type mypage struct {
	Message string
}

func main() {
	api := iris.New()
	api.Config.Render.Template.Directory = "views"
	api.Config.Render.Template.Layout = "layouts/main.html" // default ""

	/*// These are the defaults
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
	  api.Config.Render.Template = templateConfig*/

	/*api := iris.New()
	api.Config.Template = iris.PongoEngine
	api.Config.Render.Template.Engine = config.PongoEngine
	api.Config.Render.Template.Pongo.Extensions = []string{".xhtml", ".html"}*/
	api.Get("/hi", hi)

	println("Server is running at: 8080")
	api.Listen(":8080")
}

// Hi
func hi(ctx *iris.Context) {
	//ctx.Write("Hi %s", "iris")
	ctx.MustRender("page1.html", mypage{"Message from page1!"})
}

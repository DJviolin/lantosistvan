package main

/////////////////////////////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////////////////////////////

import (
	//"github.com/aymerick/raymond"
	"github.com/iris-contrib/middleware/logger"
	"github.com/kataras/iris"
)

/////////////////////////////////////////////////////////////
// MIDDLEWARE FUNCTIONS
/////////////////////////////////////////////////////////////

func irisMiddleware() {
	// Iris Logger
	iris.Use(logger.New(iris.Logger))
	// Iris Log http errors
	errorLogger := logger.New(iris.Logger)
	iris.OnError(iris.StatusNotFound, func(ctx *iris.Context) {
		errorLogger.Serve(ctx)
		ctx.Write("My Custom 404 error page")
	})
}

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
/////////////////////////////////////////////////////////////

func irisView() {
	iris.Config.Render.Template.Directory = "views-html"
	iris.Config.Render.Template.Layout = "layouts/main.html" // default ""
	//iris.Config.Render.Template.Extensions = []string{".html"}

	//api := iris.New()
	/*iris.Config.Render.Template.Directory = "views"
	iris.Config.Render.Template.Layout = "layouts/main.hbs" // default ""
	iris.Config.Render.Template.Extensions = []string{".hbs"}*/
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

	// set the template engine
	/*iris.Config.Render.Template.Engine = iris.HandlebarsEngine
	// optionaly set handlebars helpers by importing "github.com/aymerick/raymond" when you need to return and render html
	iris.Config.Render.Template.Handlebars.Helpers["boldme"] = func(input string) raymond.SafeString {
		return raymond.SafeString("<b> " + input + "</b>")
	}*/
	// NOTE:
	// the Iris' route framework {{url "my-routename" myparams}} and {{urlpath "my-routename" myparams}} are working like all other template engines,
	// so avoid custom url and urlpath helpers.
}

/////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////

type mypage struct {
	Message string
	Name    string
	Type    string
}

func hi(ctx *iris.Context) {
	//ctx.Write("Hi %s", "iris")
	ctx.MustRender("page1.html", mypage{"Message from page1!", "Iris", "Web"})

	// Optionally, set a context for the template
	/*mycontext := iris.Map{
		"Name": "Iris",
		"Type": "Web",
	}
	ctx.Render("home.hbs", mycontext)*/

	/*mycontext := iris.Map{
		"Message": "Message from page1!",
	}*/
	//ctx.Render("page1.hbs", mycontext)
	//ctx.Render("page1.html", mycontext)
}

/////////////////////////////////////////////////////////////
// ROUTES INITIALIZATION
/////////////////////////////////////////////////////////////

func irisRoutes() {
	iris.Get("/hi", hi)
}

/////////////////////////////////////////////////////////////
// MAIN
/////////////////////////////////////////////////////////////

func main() {
	irisMiddleware()
	irisView()
	irisRoutes()

	// Server init
	println("Server is running at: 8080")
	iris.Listen(":8080")
}

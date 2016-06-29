package main

/////////////////////////////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////////////////////////////

import (
	"github.com/aymerick/raymond"
	"github.com/iris-contrib/middleware/i18n"
	"github.com/iris-contrib/middleware/logger"
	"github.com/kataras/iris"
)

/////////////////////////////////////////////////////////////
// MIDDLEWARE FUNCTIONS
/////////////////////////////////////////////////////////////

func irisMiddlewareLogger() {
	// Iris Logger
	iris.Use(logger.New(iris.Logger))
	// Iris Log http errors
	errorLogger := logger.New(iris.Logger)
	iris.OnError(iris.StatusNotFound, func(ctx *iris.Context) {
		errorLogger.Serve(ctx)
		ctx.Write("My Custom 404 error page")
	})
}

func irisMiddlewareI18n() {
	iris.Use(i18n.I18nHandler(i18n.Options{Default: "hu-HU",
		Languages: map[string]string{
			"hu-HU": "./locales/locale_hu-HU.ini",
			"en-US": "./locales/locale_en-US.ini",
		}}))
	// or iris.UseFunc(i18n.I18n(....))
	// or iris.Get("/",i18n.I18n(....), func (ctx *iris.Context){})
}

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
/////////////////////////////////////////////////////////////

func irisView() {
	//api := iris.New()

	// NOTE:
	// the Iris' route framework {{url "my-routename" myparams}}
	// and {{urlpath "my-routename" myparams}} are working like all other template engines,
	// so avoid custom url and urlpath helpers.
	iris.Config.Render.Template.Engine = iris.HandlebarsEngine
	iris.Config.Render.Template.Gzip = true
	iris.Config.Render.Template.IsDevelopment = false
	iris.Config.Render.Template.Directory = "views"
	iris.Config.Render.Template.Extensions = []string{".hbs"}
	iris.Config.Render.Template.ContentType = "text/html"
	iris.Config.Render.Template.Charset = "UTF-8"
	iris.Config.Render.Template.Layout = "layouts/main.hbs" // default ""
	// optionaly set handlebars helpers by importing "github.com/aymerick/raymond
	// when you need to return and render html
	iris.Config.Render.Template.Handlebars.Helpers["boldme"] = func(input string) raymond.SafeString {
		return raymond.SafeString("<b>" + input + "</b>")
	}
	iris.Config.Render.Template.Handlebars.Helpers["__"] = func(input string) raymond.SafeString {
		return raymond.SafeString(GetFmt("translate")(input))
	}
}

/////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////

// optionally, set a context for the template
func index(ctx *iris.Context) {
	if err := ctx.Render("home.hbs", map[string]interface{}{
		"Name": "Iris",
		"Type": "Web",
		"Path": "/",
	}); err != nil {
		println(err.Error())
	}
}

// remove the layout for a specific route
func nolayout(ctx *iris.Context) {
	if err := ctx.Render("home.hbs", nil, iris.NoLayout); err != nil {
		println(err.Error())
	}
}

func my() {
	// set a layout for a party, .Layout should be BEFORE any Get or other Handle party's method
	my := iris.Party("/my").Layout("layouts/mylayout.hbs")
	my.Get("/", func(ctx *iris.Context) {
		ctx.MustRender("home.hbs", map[string]interface{}{
			"Name": "Iris",
			"Type": "Web",
			"Path": "/my/",
		})
	})
	my.Get("/other", func(ctx *iris.Context) {
		ctx.MustRender("home.hbs", map[string]interface{}{
			"Name": "Iris",
			"Type": "Web",
			"Path": "/my/other",
		})
	})
}

/*iris.Get("/", func(ctx *iris.Context) {
  // optionally, set a context  for the template
  if err := ctx.Render("home.html", map[string]interface{}{
    "Name": "Iris",
    "Type": "Web",
    "Path": "/",
  }); err != nil {
    println(err.Error())
  }
})*/

/////////////////////////////////////////////////////////////
// ROUTES INITIALIZATION
/////////////////////////////////////////////////////////////

func irisRoutes() {
	iris.StaticServe("../../app/public", "/public")  // Gzip without file cache
	iris.StaticFS("/ftp", "../../app/public/ftp", 0) // Gzip with file cache turned off

	iris.Get("/", index)
	iris.Get("/nolayout", nolayout)
}

/////////////////////////////////////////////////////////////
// MAIN
/////////////////////////////////////////////////////////////

func main() {
	irisMiddlewareLogger()
	irisMiddlewareI18n()
	irisView()
	irisRoutes()

	my()

	// Server init
	println("Server is running at: 8080")
	iris.Listen(":8080")
}

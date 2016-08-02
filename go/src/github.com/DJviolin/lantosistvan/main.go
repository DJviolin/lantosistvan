package main

/////////////////////////////////////////////////////////////
// IMPORT DEPENDENCIES
/////////////////////////////////////////////////////////////

import (
	"github.com/aymerick/raymond"
	"github.com/iris-contrib/middleware/i18n"
	"github.com/iris-contrib/middleware/logger"
	"github.com/iris-contrib/template/handlebars"
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
	iris.UseFunc(i18n.New(i18n.Config{Default: "hu-HU",
		Languages: map[string]string{
			"hu-HU": "./locales/locale_hu-HU.ini",
			"en-US": "./locales/locale_en-US.ini"}}))
	// or iris.Use(i18n.I18nHandler(....))
	// or iris.Get("/",i18n.I18n(....), func (ctx *iris.Context){})
}

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
/////////////////////////////////////////////////////////////

func irisView() {
	//api := iris.New()

	iris.Config.IsDevelopment = false // reloads the templates on each request, defaults to false
	iris.Config.Gzip = true           // compressed gzip contents to the client, the same for Response Engines also, defaults to false
	iris.Config.Charset = "UTF-8"     // defaults to "UTF-8", the same for Response Engines also

	/*irisConfig := config.Iris{
		IsDevelopment: false,
		Gzip:          true,
		Charset:       "UTF-8",
	}
	app := iris.New(irisConfig)*/

	hbs := handlebars.DefaultConfig()
	hbs.Layout = "layouts/layout.hbs" // default ""
	hbs.Helpers["boldme"] = func(input string) raymond.SafeString {
		return raymond.SafeString("<strong> " + input + "</strong>")
	}
	/*hbs.Helpers["__"] = func(input string) raymond.SafeString {
		return raymond.SafeString(GetFmt("translate")(input))
	}*/

	iris.UseTemplate(handlebars.New(hbs)).Directory("./views", ".hbs") // or .hbs , whatever you want
}

/////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////

// optionally, set a context for the template
func index(ctx *iris.Context) {
	/*if err := ctx.Render("home.hbs", map[string]interface{}{
		"Name": "Iris",
		"Type": "Web",
		"Path": "/",
	}); err != nil {
		println(err.Error())
	}*/
	ctx.Render("home.hbs", map[string]interface{}{
		"Name": "Iris",
		"Type": "Web",
		"Path": "/",
	})
}

// remove the layout for a specific route
func nolayout(ctx *iris.Context) {
	if err := ctx.Render("home.hbs", nil, iris.RenderOptions{
		"layout": iris.NoLayout,
	}); err != nil {
		ctx.Write(err.Error())
	}
}

func my() {
	// set a layout for a party, .Layout should be BEFORE any Get or other Handle party's method
	my := iris.Party("/my").Layout("layouts/mylayout.hbs")
	{
		my.Get("/", func(ctx *iris.Context) {
			// .MustRender -> same as .Render but logs the error if any and return status 500 on client
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
}

/////////////////////////////////////////////////////////////
// ROUTES INITIALIZATION
/////////////////////////////////////////////////////////////

func irisRoutes() {
	iris.StaticServe("../../app/public", "/public")  // Gzip without file cache
	iris.StaticFS("/ftp", "../../app/public/ftp", 0) // Gzip with file cache turned off

	iris.Get("/", index)
	iris.Get("/nolayout", nolayout)

	my()
}

/////////////////////////////////////////////////////////////
// MAIN
/////////////////////////////////////////////////////////////

func main() {
	irisMiddlewareLogger()
	irisMiddlewareI18n()
	irisView()
	irisRoutes()

	// Server init
	println("Server is running at: 8080")
	iris.Listen(":8080")
}

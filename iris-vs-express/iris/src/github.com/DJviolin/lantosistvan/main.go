package main

// IMPORT DEPENDENCIES
import (
	"github.com/aymerick/raymond"
	"github.com/iris-contrib/template/handlebars"
	"github.com/kataras/iris"
	"runtime"
)

// VIEW ENGINE SETUP - AKA: V(iew)
func irisView() {
	iris.Config.IsDevelopment = false // reloads the templates on each request, defaults to false
	iris.Config.Gzip = false          // compressed gzip contents to the client, the same for Response Engines also, defaults to false
	iris.Config.Charset = "UTF-8"     // defaults to "UTF-8", the same for Response Engines also

	hbs := handlebars.DefaultConfig()
	hbs.Layout = "layouts/layout.hbs" // default ""
	hbs.Helpers["boldme"] = func(input string) raymond.SafeString {
		return raymond.SafeString("<strong> " + input + "</strong>")
	}
	iris.UseTemplate(handlebars.New(hbs)).Directory("./views", ".hbs") // or .hbs , whatever you want
}

// ROUTES
// optionally, set a context for the template
func index(ctx *iris.Context) {
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

// ROUTES INITIALIZATION
func irisRoutes() {
	iris.Get("/", index)
	iris.Get("/nolayout", nolayout)
	my()
}

// MAIN
func main() {
	//runtime.GOMAXPROCS(1) // Limiting CPU cores to 1
	runtime.GOMAXPROCS(runtime.NumCPU()) // Open all cores

	irisView()

	iris.Get("/hello", func(ctx *iris.Context) {
		ctx.Write("Hello, World!")
	})

	irisRoutes()

	// Server init
	println("Server is running at: 8080")
	iris.Listen(":8080")
}

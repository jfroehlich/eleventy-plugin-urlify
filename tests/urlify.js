const test = require("ava");
const lib = require("../src/filters");

test("this and that", t => {

	const context = {
		pathPrefix: "/example/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};
	lib.urlify.call(context, "/");
	t.pass();
});

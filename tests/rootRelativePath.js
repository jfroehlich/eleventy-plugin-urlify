const test = require("ava");
const lib = require("../src/filters");

test("Absolute URLs are passed through", t => {
	const context = {
		pathPrefix: "/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};
	t.is(lib.rootRelativePath.call(context, "http://example.com/"), "http://example.com/");
});

test("Test '/' prefix", t => {
	const paths = [
		["/", "/"],
		["", "/tests/plugins.html"],
		[".", "/tests/plugins.html"],
		["/schnick.jpg", "/schnick.jpg"],
		["../schnick.jpg", "/schnick.jpg"],
		["/schnick/schnack.gif", "/schnick/schnack.gif"],
		["./schnick.jpg", "/tests/schnick.jpg"],
		["schnick.jpg", "/tests/schnick.jpg"],
		[".testrc", "/tests/.testrc"],
		["schnick/../schnack.jpg", "/tests/schnack.jpg"]
	];
	const context = {
		pathPrefix: "/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};

	t.plan(paths.length);
	paths.forEach(path => {
		t.is(lib.rootRelativePath.call(context, path[0]), path[1]);
	});
});

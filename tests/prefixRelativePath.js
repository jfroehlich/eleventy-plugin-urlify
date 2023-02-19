const test = require("ava");
const lib = require("../src/filters");

test("Absolute URLs are passed through", t => {
	const context = {
		pathPrefix: "/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};
	t.is(lib.prefixRelativePath.call(context, "http://example.com/"), "http://example.com/");
});

test("Path is made relative correctly", t => {
	const paths = [
		["/", ".."],
		["", "plugins.html"],
		[".", "plugins.html"],
		["/schnick.jpg", "../schnick.jpg"],
		["../schnick.jpg", "../schnick.jpg"],
		["/schnick/schnack.gif", "../schnick/schnack.gif"],
		["./schnick.jpg", "schnick.jpg"],
		["schnick.jpg", "schnick.jpg"],
		[".testrc", ".testrc"],
		["schnick/../schnack.jpg", "schnack.jpg"]
	];
	const context = {
		pathPrefix: "/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};

	t.plan(paths.length);
	paths.forEach(path => {
		t.is(lib.prefixRelativePath.call(context, path[0]), path[1]);
	});
});

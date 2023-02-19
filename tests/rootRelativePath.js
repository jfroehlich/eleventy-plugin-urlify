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

test("Test '/schnick/' prefix", t => {
	const paths = [
		["/", "/example/"],
		["", "/example/tests/plugins.html"],
		[".", "/example/tests/plugins.html"],
		["/schnick.jpg", "/example/schnick.jpg"],
		["../schnick.jpg", "/example/schnick.jpg"],
		["/schnick/schnack.gif", "/example/schnick/schnack.gif"],
		["./schnick.jpg", "/example/tests/schnick.jpg"],
		["schnick.jpg", "/example/tests/schnick.jpg"],
		[".testrc", "/example/tests/.testrc"],
		["schnick/../schnack.jpg", "/example/tests/schnack.jpg"]
	];
	const context = {
		pathPrefix: "/example/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};

	t.plan(paths.length);
	paths.forEach(path => {
		t.is(lib.rootRelativePath.call(context, path[0]), path[1]);
	});
});

test("Test '/sample' prefix", t => {
	const paths = [
		["/", "/sample/"],
		["", "/sample/tests/plugins.html"],
		[".", "/sample/tests/plugins.html"],
		["/schnick.jpg", "/sample/schnick.jpg"],
		["../schnick.jpg", "/sample/schnick.jpg"],
		["/schnick/schnack.gif", "/sample/schnick/schnack.gif"],
		["./schnick.jpg", "/sample/tests/schnick.jpg"],
		["schnick.jpg", "/sample/tests/schnick.jpg"],
		[".testrc", "/sample/tests/.testrc"],
		["schnick/../schnack.jpg", "/sample/tests/schnack.jpg"]
	];
	const context = {
		pathPrefix: "/sample",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};

	t.plan(paths.length);
	paths.forEach(path => {
		t.is(lib.rootRelativePath.call(context, path[0]), path[1]);
	});
});

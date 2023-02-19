const test = require("ava");
const lib = require("../src/filters");

test("Test no root relative paths", t => {
	const paths = [
		"",
		null,
		"../test",
		"https://example.com/",
		5
	];
	const context = {
		pathPrefix: "/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};

	t.plan(paths.length);
	paths.forEach(path => {
		t.false(lib.isRootRelative.call(context, path));
	});
});

test("Test root relative paths", t => {
	const paths = [
		"/",
		"/test/bla"
	];
	const context = {
		pathPrefix: "/",
		ctx: { page: { url: "/tests/plugins.html" } } 
	};

	t.plan(paths.length);
	paths.forEach(path => {
		t.true(lib.isRootRelative.call(context, path));
	});
});

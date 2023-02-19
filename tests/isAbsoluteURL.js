const test = require("ava");
const lib = require("../src/filters");

test('Protocol + domain + path is fine', t => {
	const paths = [
		"http://example.com/",
		"https://example.com/",
		"schnick://example.com/",
		"http://example.com/./test.html",
		"http://example.com/schnick/../test.html",
		"https://www.example.com/path/to/file.txt?param=1&param=2#schnick"
	];
	t.plan(paths.length);
	paths.forEach(path => {
		t.true(lib.isAbsoluteURL(path));
	});
});

test('Not an absolute URL', t => {
	const paths = [
		null,
		"",
		"/http://example.com/",
		"//example.com/",
		"./test?url=http://example.com/",
		"./test",
		"index.html",
		"../index.html"
	];
	t.plan(paths.length);
	paths.forEach(path => {
		t.false(lib.isAbsoluteURL(path));
	});
});

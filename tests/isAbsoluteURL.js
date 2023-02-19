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
	t.plan(paths.length * 2);
	paths.forEach(path => {
		const result = lib.isAbsoluteURL(path);
		t.true(result);
		t.true(typeof result === 'boolean');
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
	t.plan(paths.length * 2);
	paths.forEach(path => {
		const result = lib.isAbsoluteURL(path);
		t.false(result);
		t.true(typeof result === 'boolean');
	});
});

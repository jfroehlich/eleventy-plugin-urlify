const test = require("ava");
const lib = require("../src/filters");

test("Absolute URLs are passed through", t => {
	t.is(lib.absoluteURL("http://example.com/"), "http://example.com/");
});

/* eslint-env node */
const path = require("path").posix;

const lib = {};
module.exports = lib;

/**
 * Checks if this is an absolute URL.
 * 
 * I found this somewhere. Can't remember where – sorry.
 * 
 * @param {string} input 
 * @returns {boolean} A boolean indicating if it's an absolute URL or not.
 */
lib.isAbsoluteURL = function (input) {
	try {
		// if input is not an absolute URL the creating
		// an URL object will fail.
		new URL(input);
		return true;
	} catch(e) {
		return false;
	}
};

lib.isRootRelative = function (input) {
	if (typeof input !== 'string') {
		return false;
	}
	return input.startsWith("/");
}

/**
 * Takes a path relative or absolute URL and makes it root relative.
 * 
 * Uses the pathPrefix variable to make it relative to the root of
 * the website, wherever you are.
 *  
 * @param {string} input The path that should be made root relative
 * @returns {string} The root relative path
 */
lib.rootRelativePath = function (input, pathPrefix) {
	if (lib.isAbsoluteURL(input)) {
		// We don't need to do anything here...
		return input;
	}

	pathPrefix = (!!pathPrefix) ? pathPrefix : this.pathPrefix || "/";
	pathPrefix =  pathPrefix.replace(/\/$/, "");
	
	if (input.startsWith("/") === false) {
		input = input === "" ? "." : input;
		let origin = (input === ".") ? this.ctx.page.url : path.dirname(this.ctx.page.url) + "/";
		return path.join(pathPrefix, origin, input);
	}
	return path.join(pathPrefix, input);
};

/**
 * Transforms a relative URL to an absolute URL.
 * 
 * @param {string} input 
 * @param {string} baseURL 
 * @returns 
 */
lib.absoluteURL = function (input, baseURL, pathPrefix) {
	if (lib.isAbsoluteURL(input)) {
		// We don't need to do anything here...
		return input;
	}

	if (!!baseURL === false) {
		baseURL = (!!this.ctx.site && !!this.ctx.site.baseURL) ? this.ctx.site.baseURL: "http://localhost/";
	}

	// The input path should be root relative.
	input = lib.rootRelativePath.call(this, input, pathPrefix);
	try {
		return (new URL(input, baseURL)).toString()
	  } catch(e) {
		console.error(`Failed to convert '${input}' with base ${baseURL} to an absolute URL and failed.`);
		return input;
	  }
};

lib.prefixRelativePath = function (input, pathPrefix) {
	if (lib.isAbsoluteURL(input)) {
		// We don't need to do anything here...
		return input;
	}

	// ...
};

lib.urlify = function (input, options) {
	const config = Options.assign({
		baseURL: this.urlify.baseURL || "http://example.com",
		pathPrefix: this.urlify.pathPrefix || "/",
		urlifyMode: this.urlify.urlifyMode || "root-relative"
	}, options);

	console.log(this.urlify);
	return input;
}
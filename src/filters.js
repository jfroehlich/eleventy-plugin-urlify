/* eslint-env node */

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
}

/* eslint-env node */
const filters = require("./filters");

function _plugin(api, settings={}) {
	const opts = Object.assign({
		// This is the eleventy path prefix by default
		// but you may override it in the settings if you must.
		pathPrefix: api.pathPrefix || "/",

		// Sets the mode for the urlify filter 
		// Modes:
		// 	- **root-relative** make URLs relative to the site root.
		//	- **base-relative** make URLs relative to the pathPrefix
		//  - **absolute** make URLs absolute
		urlifyMode: "root-relative",

		filterMapping: {
			// <filterName>: <functionName>"
			isAbsoluteURL: "isAbsoluteURL"

		}
	}, settings);

	// Ok, now register the filters...
	Object.keys(opts.filterMapping).forEach(name => {
		api.addFilter(name, lib[opts.filterMapping[name]]);
	});
}
module.exports = _plugin;

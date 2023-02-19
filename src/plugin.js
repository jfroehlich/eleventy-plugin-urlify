/* eslint-env node */

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

		}
	}, settings);
}

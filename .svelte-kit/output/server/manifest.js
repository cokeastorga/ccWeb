export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","logos/logoasvip.jpg","logos/logodelicias.jpg","logos/logofinder.jpg","logos/logosat.jpg","logos/logosendo.jpg","og-image.jpg"]),
	mimeTypes: {".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.C88fUwqt.js","app":"_app/immutable/entry/app.SLEjCVo8.js","imports":["_app/immutable/entry/start.C88fUwqt.js","_app/immutable/chunks/entry.CKs0taU1.js","_app/immutable/chunks/runtime.CTD5oryc.js","_app/immutable/chunks/index.B7Ptfqfi.js","_app/immutable/entry/app.SLEjCVo8.js","_app/immutable/chunks/runtime.CTD5oryc.js","_app/immutable/chunks/render.BSc_5Bm6.js","_app/immutable/chunks/events.YJxIBA3p.js","_app/immutable/chunks/disclose-version.DCJWNbpt.js","_app/immutable/chunks/if.BvCDtGMV.js","_app/immutable/chunks/store.DPdpR0Ad.js","_app/immutable/chunks/index.B7Ptfqfi.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

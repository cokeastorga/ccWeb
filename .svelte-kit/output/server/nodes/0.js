import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.D3LkiyMu.js","_app/immutable/chunks/disclose-version.DCJWNbpt.js","_app/immutable/chunks/runtime.CTD5oryc.js","_app/immutable/chunks/legacy.CYGijVX6.js","_app/immutable/chunks/render.BSc_5Bm6.js","_app/immutable/chunks/events.YJxIBA3p.js","_app/immutable/chunks/if.BvCDtGMV.js","_app/immutable/chunks/lifecycle.CuIdTyE6.js"];
export const stylesheets = ["_app/immutable/assets/0.BjSq0kf_.css"];
export const fonts = [];

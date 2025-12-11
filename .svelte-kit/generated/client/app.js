export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [4],
		"/ecommerce-v2": [5,[2]],
		"/ecommerce-v2/checkout": [6,[2]],
		"/ecommerce-v2/product/[id]": [7,[2]],
		"/ecommerce-v2/shop": [8,[2]],
		"/ecommerce-v2/success": [9,[2]],
		"/ecommerce-v3": [10,[3]],
		"/ecommerce-v3/checkout": [11,[3]],
		"/ecommerce-v3/product/[id]": [12,[3]],
		"/ecommerce-v3/shop": [13,[3]],
		"/ecommerce-v3/success": [14,[3]],
		"/gracias": [15],
		"/privacidad": [16],
		"/terminos": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';
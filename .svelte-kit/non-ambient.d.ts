
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/ecommerce-v2" | "/ecommerce-v2/product" | "/ecommerce-v2/product/checkout" | "/ecommerce-v2/product/success" | "/ecommerce-v2/product/[id]" | "/gracias" | "/privacidad" | "/terminos";
		RouteParams(): {
			"/ecommerce-v2/product/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/ecommerce-v2": { id?: string };
			"/ecommerce-v2/product": { id?: string };
			"/ecommerce-v2/product/checkout": Record<string, never>;
			"/ecommerce-v2/product/success": Record<string, never>;
			"/ecommerce-v2/product/[id]": { id: string };
			"/gracias": Record<string, never>;
			"/privacidad": Record<string, never>;
			"/terminos": Record<string, never>
		};
		Pathname(): "/" | "/ecommerce-v2" | "/ecommerce-v2/" | "/ecommerce-v2/product" | "/ecommerce-v2/product/" | "/ecommerce-v2/product/checkout" | "/ecommerce-v2/product/checkout/" | "/ecommerce-v2/product/success" | "/ecommerce-v2/product/success/" | `/ecommerce-v2/product/${string}` & {} | `/ecommerce-v2/product/${string}/` & {} | "/gracias" | "/gracias/" | "/privacidad" | "/privacidad/" | "/terminos" | "/terminos/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/fondo1.png" | "/fondo2.png" | "/fondo3.png" | "/fondo4.png" | "/fondo5.png" | "/fondo6.png" | "/hero.png" | "/logos/logoasvip.jpg" | "/logos/logodelicias.jpg" | "/logos/logofinder.jpg" | "/logos/logosat.jpg" | "/logos/logosendo.jpg" | "/mariposa.json" | "/og-image.jpg" | "/videos/fondohero.webm" | string & {};
	}
}
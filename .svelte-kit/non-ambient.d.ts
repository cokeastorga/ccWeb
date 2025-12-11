
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
		RouteId(): "/" | "/ecommerce-v2" | "/ecommerce-v2/checkout" | "/ecommerce-v2/product" | "/ecommerce-v2/product/[id]" | "/ecommerce-v2/shop" | "/ecommerce-v2/success" | "/ecommerce-v3" | "/ecommerce-v3/checkout" | "/ecommerce-v3/product" | "/ecommerce-v3/product/[id]" | "/ecommerce-v3/shop" | "/ecommerce-v3/success" | "/gracias" | "/landing-wp" | "/privacidad" | "/terminos";
		RouteParams(): {
			"/ecommerce-v2/product/[id]": { id: string };
			"/ecommerce-v3/product/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/ecommerce-v2": { id?: string };
			"/ecommerce-v2/checkout": Record<string, never>;
			"/ecommerce-v2/product": { id?: string };
			"/ecommerce-v2/product/[id]": { id: string };
			"/ecommerce-v2/shop": Record<string, never>;
			"/ecommerce-v2/success": Record<string, never>;
			"/ecommerce-v3": { id?: string };
			"/ecommerce-v3/checkout": Record<string, never>;
			"/ecommerce-v3/product": { id?: string };
			"/ecommerce-v3/product/[id]": { id: string };
			"/ecommerce-v3/shop": Record<string, never>;
			"/ecommerce-v3/success": Record<string, never>;
			"/gracias": Record<string, never>;
			"/landing-wp": Record<string, never>;
			"/privacidad": Record<string, never>;
			"/terminos": Record<string, never>
		};
		Pathname(): "/" | "/ecommerce-v2" | "/ecommerce-v2/" | "/ecommerce-v2/checkout" | "/ecommerce-v2/checkout/" | "/ecommerce-v2/product" | "/ecommerce-v2/product/" | `/ecommerce-v2/product/${string}` & {} | `/ecommerce-v2/product/${string}/` & {} | "/ecommerce-v2/shop" | "/ecommerce-v2/shop/" | "/ecommerce-v2/success" | "/ecommerce-v2/success/" | "/ecommerce-v3" | "/ecommerce-v3/" | "/ecommerce-v3/checkout" | "/ecommerce-v3/checkout/" | "/ecommerce-v3/product" | "/ecommerce-v3/product/" | `/ecommerce-v3/product/${string}` & {} | `/ecommerce-v3/product/${string}/` & {} | "/ecommerce-v3/shop" | "/ecommerce-v3/shop/" | "/ecommerce-v3/success" | "/ecommerce-v3/success/" | "/gracias" | "/gracias/" | "/landing-wp" | "/landing-wp/" | "/privacidad" | "/privacidad/" | "/terminos" | "/terminos/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/fav.png" | "/favicon.ico" | "/favicon.png" | "/flayer_navi.jpg" | "/flayer_navi2.jpg" | "/flayer_navi3.jpg" | "/flayer_navidad.jpg" | "/fondo1.png" | "/fondo2.png" | "/fondo3.png" | "/fondo4.png" | "/fondo5.png" | "/fondo6.png" | "/hero.png" | "/logo.png" | "/logos/logoasvip.jpg" | "/logos/logodelicias.jpg" | "/logos/logofinder.jpg" | "/logos/logosat.jpg" | "/logos/logosendo.jpg" | "/mariposa.json" | "/og-image.jpg" | "/videos/fondohero.webm" | string & {};
	}
}
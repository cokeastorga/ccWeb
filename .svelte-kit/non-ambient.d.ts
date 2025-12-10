
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
		RouteId(): "/" | "/gracias" | "/privacidad" | "/prueba" | "/terminos";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/gracias": Record<string, never>;
			"/privacidad": Record<string, never>;
			"/prueba": Record<string, never>;
			"/terminos": Record<string, never>
		};
		Pathname(): "/" | "/gracias" | "/gracias/" | "/privacidad" | "/privacidad/" | "/prueba" | "/prueba/" | "/terminos" | "/terminos/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/fondo1.png" | "/fondo2.png" | "/fondo3.png" | "/fondo4.png" | "/fondo5.png" | "/fondo6.png" | "/hero.png" | "/logos/logoasvip.jpg" | "/logos/logodelicias.jpg" | "/logos/logofinder.jpg" | "/logos/logosat.jpg" | "/logos/logosendo.jpg" | "/mariposa.json" | "/og-image.jpg" | "/videos/fondohero.webm" | string & {};
	}
}
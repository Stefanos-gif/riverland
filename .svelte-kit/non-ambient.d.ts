
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
		RouteId(): "/";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>
		};
		Pathname(): "/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/0ce83324-cbd6-4cb7-8f39-474124b79377.JPG" | "/10.JPG" | "/11.JPG" | "/12.JPG" | "/13.jpg" | "/14.JPG" | "/15.jpg" | "/16.JPG" | "/17.jpg" | "/18.jpg" | "/2.jpg" | "/3.JPG" | "/4.JPG" | "/5.JPG" | "/5fca090e-a74a-4d1b-bee9-121fb93d9425.JPG" | "/6.5.JPG" | "/6.6.jpg" | "/6.7.jpg" | "/6.JPG" | "/7.JPG" | "/8.5.jpg" | "/8.MP4" | "/9.JPG" | "/98.mov" | "/99.JPG" | "/ddf9c430-0d1f-4c47-8f90-d25be77d9169.JPG" | "/e5c2854c-7bb0-4293-81df-30359a21b8e0.JPG" | "/IMG_0375.jpg" | "/IMG_0378.jpg" | "/IMG_0379.jpg" | "/IMG_0380.jpg" | "/IMG_0384.jpg" | "/IMG_0387.jpg" | "/IMG_0392.jpg" | "/IMG_0394.jpg" | "/IMG_0398.jpg" | "/IMG_0400.jpg" | "/IMG_0402.jpg" | "/IMG_0405.jpg" | "/IMG_0406.jpg" | "/IMG_0417.jpg" | "/IMG_0419.jpg" | "/IMG_0421.jpg" | "/IMG_0422.jpg" | "/IMG_0425.jpg" | "/IMG_0437.jpg" | "/robots.txt" | string & {};
	}
}
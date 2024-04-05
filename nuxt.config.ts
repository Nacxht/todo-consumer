// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	css: ["~/assets/css/main.css"],

	runtimeConfig: {
		apiSecret: "",

		public: {
			apiUrl: process.env.API_BASE_URL || "/api",
		},
	},

	// routeRules: {
	// 	"/api/**": {
	// 		proxy: { to: process.env.API_BASE_URL || "/api" },
	// 		cors: true,
	// 		headers: {
	// 			"access-control-allow-methods": "GET,HEAD,PATCH,POST,DELETE",
	// 			"access-control-allow-origin": "http://localhost:3000",
	// 			"access-control-allow-credentials": "true",
	// 		},
	// 	},
	// },
});

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
			apiUrl: process.env.API_BASE_URL || "",
		},
	},

	modules: ["tailwindcss"],
});

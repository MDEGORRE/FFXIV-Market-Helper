// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	modules: [
		'@nuxtjs/tailwindcss'
	],
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			  	},
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/ffxiv-market-helper-logo.webp' },
			]
	}
	},
  	devtools: { enabled: true },
})

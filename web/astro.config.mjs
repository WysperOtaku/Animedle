import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	devToolbar: {
		enabled: false
	},
	integrations: [
		starlight({
			title: 'Animedle API Docs',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/wysperotaku/animedle' }
			],
			sidebar: [
				{
					label: 'Como funciona',
					items: [
						{ label: 'Como funciona', slug: 'how-it-works' },
					],
				},
				{
					label: 'Documentacion',
					items: [
						{ label: 'Reto diario', slug: 'docs/endpoints/daily-challenge' },
						{ label: 'Historial', slug: 'docs/endpoints/history' },
						{ label: 'Anime por ID', slug: 'docs/endpoints/anime-id' },
					],
				},
				{
					label: 'Ejemplos',
					items: [
						{ label: 'JavaScript', slug: 'docs/examples/javascript' },
						{ label: 'TypeScript', slug: 'docs/examples/typescript' },
					],
				},
				{
					label: 'Juego de pruebas',
					items: [
						{ label: 'Juego de pruebas', slug: 'playground' },
					],
				},
				{
					label: 'Sobre el proyecto',
					items: [
						{ label: 'Sobre el proyecto', slug: 'about' },
					],
				},
			],
		}),
	],
});

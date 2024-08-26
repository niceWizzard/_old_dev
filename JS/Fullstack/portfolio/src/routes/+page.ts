export async function load({ fetch }) {
	const url =
		'https://raw.githubusercontent.com/niceWizzard/resource_dump/main/portfolio/works.json';

	const projectsList: Project[] = await (await fetch(url)).json();

	return {
		projectsList
	};
}
export interface Project {
	name: string;
	description: string;
	date: string;
	url: string;
	imageUrl: string;
}

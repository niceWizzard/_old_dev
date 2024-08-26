<script lang="ts">
	import { IconExternalLink } from '@tabler/icons-svelte';
	import type { Project } from '../../routes/+page.ts';
	export let projectsList: Project[];
</script>

<div class="mt-14 flex flex-col gap-4 text-2xl text-on-surface py-6">
	<h3 class=" bg-on-background p-3 text-4xl">My Projects</h3>
	<p class="text-on-background">Here are some of the projects I have created in the past.</p>
	{#each projectsList as project}
		<div class="rounded-lg border-gray-500 overflow-clip">
			<div class="flex flex-row p-4 items-center bg-on-background justify-between">
				<span class="text-2xl">{project.name}</span>
				<a href={project.url} target="_blank">
					<IconExternalLink size={32} />
				</a>
			</div>
			<img src={project.imageUrl} alt={project.name} />
		</div>
	{/each}
	<a
		class="bg-on-background-pop text-on-surface rounded-md p-4 font-semibold text-center"
		href="/projects">See more</a
	>
</div>

<script lang="ts">
	import Profile from '../components/home/profile.svelte';
	import ProjectsList from '../components/home/projectsList.svelte';
	import ContactForm from '../components/home/contactForm.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
	export let data;
</script>

<div class="flex h-[60vh] flex-col justify-around gap-10 relative items-center mb-10">
	<img
		src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		alt="bg"
		width="100%"
		class="absolute top-0 left-0 z-[-1] object-cover h-full w-full"
		style="filter: blur(1px)"
	/>
	<h3 class="text-on-surface w-max bg-on-background p-6 font-semibold text-4xl text-center mt-4">
		Create. Innovate. <br />
		<span class="text-on-background-pop underline underline-offset-4">Don't Hesitate.</span>
	</h3>
</div>
<div class="px-4">
	<Profile />
	<ProjectsList projectsList={data.projectsList} />
	<ContactForm form />
</div>

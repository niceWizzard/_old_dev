<script>
	const lang = ['Javascript', 'Typescript', 'C#', 'Dart', 'Python'];
	const tools = ['Angular', 'React', 'Vue', 'Svelte', 'Flutter', 'Godot'];
</script>

<div class="text-2xl">
	<div class="my-4">
		<div class="flex flex-row items-center gap-4 bg-on-background text-on-surface">
			<img
				src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
				alt="My Profile"
				width="128"
				class="border-r-4"
			/>
			<span class="text-3xl py-4"
				>Coder RM <br /><span class="text-lg">- 2nd Year Computer Science Student </span></span
			>
		</div>
		<p class="mt-4">
			Been coding since 2020. I am a 2nd year Computer Science student at the Bulacan State
			University. I am a full-stack developer and I am currently learning more about web development
			and mobile app development.
		</p>
	</div>
	<h4 class="text-on-background text-4xl font-semibold mb-2">Programming Languages I Know</h4>
	<p>
		Here are some of the languages I have worked with some of my self projects. I feel confident to
		be able to use them for any project.
	</p>
	<ol class="gap-4 py-4 text-on-background list-disc list-inside pl-4">
		{#each lang as l}
			<li class=" capitalize">{l}</li>
		{/each}
	</ol>
	<h4 class="text-on-background text-4xl font-semibold mb-2">Tools I Use</h4>
	<p>
		The tools I use for my projects. I am still learning these tools but I feel confident to be able
		to use them for any project.
	</p>
	<ol class=" py-4 text-on-background list-disc list-inside pl-4">
		{#each tools as t}
			<li class=" capitalize">{t}</li>
		{/each}
	</ol>
</div>

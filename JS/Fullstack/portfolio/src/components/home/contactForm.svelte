<script lang="ts">
	import type { ActionData } from '../../routes/$types';

	export let form: ActionData;
</script>

{#if form?.contactSuccess}
	<h1>Nice</h1>
{/if}

<form class="bg-on-background p-4 flex flex-col text-2xl gap-4 my-4">
	<div class="flex flex-col gap-2">
		<label for="name" class="label text-on-surface"> Name </label>
		<input type="text" name="name" class="input text-2xl" placeholder="Enter your name here." />
	</div>
	<div class="flex flex-col gap-2">
		<label for="email" class="label text-on-surface"> Email </label>
		<input type="email" name="email" class="input text-2xl" placeholder="Enter your email here." />
	</div>
	<div class="flex flex-col gap-2">
		<label for="message" class="textarea text-on-surface"> Your Message </label>
		<textarea
			name="message"
			cols="20"
			class="text-2xl textarea"
			rows="5"
			placeholder="Your message goes here."
		></textarea>
	</div>
	<input
		type="submit"
		class="input text-on-surface bg-on-background-pop p-3 text-2xl"
		value="Send"
	/>
</form>

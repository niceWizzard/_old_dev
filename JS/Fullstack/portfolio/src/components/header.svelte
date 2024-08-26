<script lang="ts">
	import { IconMenu2 } from '@tabler/icons-svelte';
	import { slide } from 'svelte/transition';
	let showNav = false;
</script>

<header class="min-h-[10vh] border-b border-gray-400 text-xl text-primary">
	<div class=" px-4 py-2 min-h-[inherit] flex flex-row justify-between items-center h-full">
		<h3 class="font-bold">RMM</h3>
		<button on:click={() => (showNav = !showNav)}>
			<IconMenu2 size={32} />
		</button>
	</div>
	{#if showNav}
		<nav transition:slide class="flex flex-col justify-between items-center text-2xl">
			<a class="_nav-link" href="/">Home</a>
			<a class="_nav-link" href="/about">About</a>
			<a class="_nav-link" href="/works">Works</a>
			<a class="_nav-link" href="/contact">Contact</a>
		</nav>
	{/if}
</header>

<style lang="scss">
	._nav-link {
		@apply text-on-background w-full px-4 py-3;
		transition: all 0.1s ease-in-out;
		&:hover {
			@apply bg-on-background-pop text-on-surface;
		}
	}
</style>

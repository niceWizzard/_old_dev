<template>
  <div class="h-screen flex flex-col justify-stretch">
    <header class="p-3 bg-blue-500 text-white w-full">
      <nav class="flex flex-row justify-between items-center">
        <h1 class="text-2xl font-semibold">ForumPoster</h1>
        <UserButton/>
      </nav>
    </header>
    <div class="w-full h-full">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
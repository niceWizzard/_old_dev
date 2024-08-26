<template>
  <section class=" grid place-items-center  w-full h-screen  " >
    <div class="w-2xl h-4xl p-4 border border-gray-500 rounded-md text-center flex gap-3 flex-col">
      <h4 class="text-2xl ">Login with your account</h4>
      <span class="font-light">Join the wonderful world of forum poster!</span>
      <div class="mt-4 items-center justify-center flex w-full">
        <UButton label="Sign in with Github"  @click="onClick()" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: 'no-header',
    auth: {
      unaunethenticatedOnly: true
    }
  })
  const {signIn} = useAuth()
  async function onClick() {
    try {
      await signIn('github', {callbackUrl: '/'})
    } catch(e) {
      console.log("ERROR HAPPEN DURING LOGING IN ", e)
    }
  }
</script>

<style>

</style>
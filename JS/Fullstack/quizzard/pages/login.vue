<script setup lang="ts">
  const { signIn } = useAuth()
  definePageMeta( {
    middleware: "auth",
    auth: {
      navigateAuthenticatedTo: '/',
      unauthenticatedOnly: true,
    }
  })
  async function signInWithCredentials() {
    try {
      await signIn("github")
    } catch (error) {
      alert("Error when logging in!");
      console.error(error)
    }
  }

</script>
<template>
  <div class="grid place-content-center">
    <div class="border border-main border-r-2 p-3 grid place-content-center gap-3">
        <h3 class="text-center font-bold text-xl">Join us!</h3>
        <UButton color="primary" variant="outline" v-on:click="signInWithCredentials()">Login with Github</UButton>
    </div>
  </div>
</template>
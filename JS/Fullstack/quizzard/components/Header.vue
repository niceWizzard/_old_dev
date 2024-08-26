<script lang="ts" setup>



  const {data,status, signOut} = useAuth()

  function canRenderLoginBtn() {
    return status.value !== 'authenticated' && 
           useRouter().currentRoute.value.fullPath.includes('login') === false
  }

</script>

<template >
  <header class="border-b border-b-primary items-center min-h-[7vh] p-3 flex flex-row justify-between">
    <ULink to="/"><h1 class="text-primary text-bold text-xl">Quizzard</h1></ULink>
    <div class="flex flex-row gap-6">
      <UButton to="/login"  v-if="canRenderLoginBtn()">Login</UButton>
      <UButton to="/login" v-if="status == 'authenticated'">Create Quiz</UButton>
      <UButton  color="danger" variant="outline" v-on:click="signOut()"
      v-if="status == 'authenticated'">Logout</UButton>
    </div>
  </header>
</template>



<style>

</style>
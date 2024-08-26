<template>
  <main class="h-full w-screenflex items-center justify-center p-6">
      <form class="border border-gray-800 rounded-md p-6 h-full flex flex-col items-stretch justify-start gap-2"
            @submit.prevent="createAccount"      
      >
        <h3>Welcome to Forum Poster!</h3>
        <p>Forum poster is a popular and goto website for any kind of posts!</p>
        <br>
        <UInput label="Name" v-model="name" />
        <UButton label="Create an account" type="submit" />
      </form>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth'
  })
  const {data : {value}, status} = useAuth()
  const name = ref(value?.user?.name ?? "")

  async function createAccount() {
    if(!name.value) {
      alert("Name is required")
      return
    }
    const res = await $fetch('/api/users/create', {
      method: "POST",
      body: {
        name: name.value
      }
    })
    console.log("RESPONSE ", res)
  }

</script>

<style>

</style>
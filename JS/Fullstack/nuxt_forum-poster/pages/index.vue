<template>
  <div>
    <div v-if="status == 'unauthenticated'">
      You are unathenticated
    </div>
    <div v-if="status == 'authenticated'">
      <p class="break-words">
        {{ data?.user?.email}}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const {signIn, data,signOut, status} = useAuth()

</script>

<style>

</style>
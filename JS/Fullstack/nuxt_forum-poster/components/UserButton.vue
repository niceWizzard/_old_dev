<template>
  <div>
    <NuxtLink href="/login" v-if="status == 'unauthenticated'">
      Login
    </NuxtLink>
    <UPopover v-if="isAuthenticated">
      <UButton color="white" icon="i-material-symbols-account-circle"/>
      <template #panel>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex flex-row gap-2">
            <img :src="user!.image!" class="rounded-full w-16 h-16" />
            <span>{{user!.name }}</span>
          </div>
          <UButton @click="signOut" label="Sign out" variant="soft" />
        </div>
      </template>
  </UPopover>
  </div>
</template>

<script lang="ts" setup>
import type { Session } from 'next-auth';

  definePageMeta({
    auth: false
  })
  const {data,signOut, status} = useAuth()
  const user: Required<Session["user"]> = data.value?.user as Required<Session["user"]>
  const isAuthenticated = status.value == 'authenticated' && user != null
</script>

<style>

</style>
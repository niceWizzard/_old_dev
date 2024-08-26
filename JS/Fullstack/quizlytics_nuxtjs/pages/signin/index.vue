<script setup lang="ts">
import { SupportedProviders } from '@sidebase/nuxt-auth/dist/runtime/composables/authjs/useAuth';
    definePageMeta({
        middleware: [
            "no-auth"
        ]
    })
    const {signIn, data} = useAuth()
    function handleSignin(prov : SupportedProviders) {
        signIn(prov, {callbackUrl: "/signin/confirm"})
    }
</script>

<template>
    <main class="flex flex-col items-center justify-center p-5">
        <div class="border rounded-md p-5 text-center  max-w-lg flex flex-col h-[300px]">
            <h3 class="text-2xl mb-10">Sign in now</h3>
            <button class="p-1 border text-center px-6 py-2 border-blue-600 bg-blue-600 text-white rounded-md flex flex-row gap-4 items-center" @click="handleSignin('google')" >
                <img src="@/assets/images/signin/google_btn.svg" class="rounded-md justify-self-start"  />
                <span class="text-lg">Sign in with Google</span>
            </button>
        </div>
    </main>
</template>
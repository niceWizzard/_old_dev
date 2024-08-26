
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/userStore';

    definePageMeta({
        middleware: [
            "auth"
        ]
    })
    const {userData} = useUserAuth()
    const h = useUserStore()
    const {createdClasses}: {createdClasses: any} = storeToRefs(h)
</script>

<template>
    <div v-if="userData">
        <div v-for="c in createdClasses">
            <pre>
                {{c  }}

            </pre>
        </div>
    </div>
</template>
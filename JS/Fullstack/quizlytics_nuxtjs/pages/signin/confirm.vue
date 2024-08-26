<script setup lang="ts">
    const {data} = useAuth()
    watch(data, () => {
        if(data.value?.user !== undefined) {

            // const user = await $fetch(`/api/users/${data.value.user.}`)

            return navigateTo('/')
        }
    }, {immediate : true})
</script>


<template>
    <div>
        Logging in!
    </div>
</template>
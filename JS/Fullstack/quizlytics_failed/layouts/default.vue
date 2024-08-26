<script setup lang="ts">
useHead({
        title: "Quizlytics",
        meta: [
            {
                name: "description",
                content: "Fueling your quest for knowledge through interactive exploration and insightful analysis."
            }
        ]
    })
</script>


<template>
    <Head>
        <Title>Quizlytics</Title>
    </Head>
    <Header />
    <slot/>
    <Footer/>
</template>
<template>
    <main
    class="flex flex-col gap-4 items-center"
    >
        <div
        class="p-6 flex flex-col gap-4 items-center"
        >
            <div class="max-w-2xl flex flex-col gap-4 py-4">

                <section
                class="px-6 py-4 bg-onBg-ltr rounded-lg "
                >
                    <h4 class="mb-3 sm:text-2xl text-xl font-bold text-onBg-dark text-center">Our Mission</h4>
                    <p class="sm:text-lg" >At Quizlytics, our mission is to transform the way people engage with knowledge. We believe that learning is a lifelong journey fueled by curiosity, exploration, and meaningful insights. Our goal is to bridge the gap between traditional quizzes and in-depth understanding, making learning not just informative, but also enlightening and enjoyable.</p>
                </section>
                <section
                >
                    <h4 class="mb-3 sm:text-2xl text-lg font-bold text-onBg-dark">Learn More About Quizlytics</h4>
                    <div class="flex flex-col gap-4">
                        <NuxtLink to="/" class="px-4 py-2 rounded-md bg-onBg-ltr font-medium text-lg" >Facebook Page</NuxtLink>
                        <NuxtLink to="/" class="px-4 py-2 rounded-md bg-onBg-ltr font-medium text-lg" >Twitter</NuxtLink>
                        <NuxtLink to="/" class="px-4 py-2 rounded-md bg-onBg-ltr font-medium text-lg" >Reddit</NuxtLink>
                    </div>
                </section>
            </div>
        </div>

        <section
        class="p-6 bg-primary-lt text-onPrimary flex justify-center max-w-2xl sm:rounded-lg sm:mx-6"
        >
            <div
            class="flex flex-col gap-4 "
            >
                <h4 class="text-onPrimary font-bold text-2xl sm:text-4xl">Join us</h4>
                    
                <p class="sm:text-lg">Join us in redefining the way we learn, explore, and analyze knowledge. Together, let's unlock the potential of quizzes to illuminate the pathways to understanding.</p>
                <NuxtLink to="/signin" class="bg-primary-ltr px-4 py-2 text-onBg font-bold text-lg rounded-md text-center sm:self-end self-stretch" >Join Now</NuxtLink>
            </div>
        </section>
    </main>
</template>
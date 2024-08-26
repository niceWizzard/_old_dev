<template>
    <footer 
    class="w-full px-6 mt-10 py-2"
    >
      <section>
        <h4
        class="text-primary-dark font-extrabold text-xl my-2"
        >
          Quizlytics
        </h4>
        <hr
        class="border-onBg"
        />
        <div
        class="flex flex-row flex-wrap items-start gap-20 my-4"
        >
          <div
          class="flex flex-col gap-1 py-4 font-semibold text-onBg"
          >
            <NuxtLink to="/about" >About Us</NuxtLink>
            <NuxtLink to="/landing#contact" >Contact Us</NuxtLink>
            <NuxtLink to="/landing" >Privacy Policy</NuxtLink>
            <NuxtLink to="/landing" >Terms & Conditions</NuxtLink>
            <NuxtLink to="/landing" >Sitemap</NuxtLink>
          </div>
          <div
          class="flex flex-col gap-1 py-4 font-semibold text-onBg"
          >
            <NuxtLink to="/landing" >Reddit</NuxtLink>
            <NuxtLink to="/landing" >Facebook</NuxtLink>
            <NuxtLink to="/landing" >Twitter</NuxtLink>
          </div>
        </div>
        <div
        class="flex flex-col sm:items-center"
        >
          <span>
            Quizlytics &copy; {{new Date().getFullYear()}}
          </span>
          <span>
            Made by CoderRM
          </span>
        </div>
      </section>
    </footer>
</template>
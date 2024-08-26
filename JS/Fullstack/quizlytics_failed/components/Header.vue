<template>
    <header
    class="w-full h-[10vh] shadow-md"
    >
        <nav
        class="px-6 py-3 w-full h-full flex flex-row justify-between items-center"
        >
            <NuxtLink to="/">
              <h2
              class="text-xl font-extrabold text-primary-dark"
              >Quizlytics</h2>
            </NuxtLink>
            <button type="button"
            class="text-primary hover:text-primary-dark sm:hidden"
            >
                burger
            </button>
        </nav>
    </header>
</template>
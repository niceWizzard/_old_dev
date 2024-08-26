
<script lang="ts" setup>
    const highlightsCircleImageInfo = [156, 36, 12, 200];
</script>
<template>
    <main>
        <section
        class='py-16 text-center relative overflow-hidden'
        >
          <div
          class='flex px-6  flex-col gap-6 items-center text-center'
          >
            <h2
            class='text-2xl font-extrabold text-onBg-dark'
            >
              <span class='text-primary text-3xl inline-block brand__anim'>
                Empowering Curiosity
              </span>        
              <br />
              Explore, Learn, and Analyze
            </h2>
            <span
            class='max-w-[250px] text-md'
            >
              Fueling your quest for knowledge through interactive exploration and insightful analysis
            </span>
            <NuxtLink
            to="/signin"
            class='button-primary px-6 py-3 rounded-md font-bold text-2xl max-w-sm '
            >Get Started</NuxtLink>
          </div>
            <img v-for="(val, index) in highlightsCircleImageInfo" :key="index"
                class="highlight__circle absolute z-[-10] select-none  highlight__circle-anim translate-x-[-50%] translate-y-[50%] "
                :class="'highlight__circle-' + val"
                :width="val"
                :height="val"
                :style="{animationDelay: (index+1)*100 + 'ms'}"
                aria-hidden
                src="@/assets/images/circle.png"
                alt="Circle"
            />
        </section>
        <section
        class='px-6 py-2 flex flex-row justify-center gap-6 items-center flex-wrap w-full'
        >
          <article
          class='bg-onBg-ltr py-4 px-6 rounded-lg max-w-[300px]'
          >
            <h3
            class='text-xl font-extrabold text-onBg-dark'
            >Unlock Your Mind's Potential</h3>
            <p>
            Discover a new dimension of learning and fun with Quizlytics - where quizzes evolve into insights.
            </p>
          </article>
          <article
          class='bg-onBg-ltr py-4 px-6 rounded-lg max-w-[300px]'
          >
            <h3
            class='text-xl font-extrabold text-onBg-dark'
            >Quizzes Reimagined, Knowledge Amplified</h3>
            <p>
            Elevate your learning experience with Quizlytics, where quizzes fuse with analytics to provide you with meaningful insights.
            </p>
          </article>
          <article
          class='bg-onBg-ltr py-4 px-6 rounded-lg max-w-[300px]'
          >
            <h3
            class='text-xl font-extrabold text-onBg-dark'
            >
              Quiz, Learn, Analyze: All in One Place
            </h3>
            <p>
            Dive into the world of knowledge exploration with Quizlytics, the app that transforms quizzes into pathways to deeper insights.
            </p>
          </article>
        </section>
        <section
      class='px-6 my-10 '
      >
          <h2 class='font-bold text-onBg-dark text-2xl md:text-3xl'>What We Offer</h2>
        <div
        class='mt-3 flex flex-col items-center gap-4'
        >
          <article
          class='card_what-we-offer'
          >
            <img
              src="@/assets/images/card_interactive_learning.png"
              :width="92*1.5"
              :height="81*1.5"
              alt="Card image"
              class='object-content'
            /> 
            <div class='flex flex-col gap-6 flex-grow'>
              <h4 class='font-bold text-onBg-dark text-lg sm:text-2xl'>Choose Your Quiz</h4>
              <p class='text-onBg text-md sm:text-lg'>
              Browse through our diverse collection of quizzes covering a wide range of topics. Select the quiz that piques your interest or aligns with your learning goals.
              </p>
            </div>
          </article>
          <article
          class='card_what-we-offer'
          >
            <img
              src="@/assets/images/card_community.png"
              :width="90*1.5"
              :height="107*1.5"
              alt="Card image"
              class='object-content'
            /> 
            <div class='flex flex-col gap-6 flex-grow'>
              <h4 class='font-bold text-onBg-dark text-lg sm:text-2xl'>Interactive Learning</h4>
              <p class='text-onBg text-md sm:text-lg'>
              Engage with the quiz questions in an interactive format. Each question isn't just a test; it's an opportunity to explore concepts and dive deeper into the subject matter.
              </p>
            </div>
          </article>
          <article
          class='card_what-we-offer'
          >
            <img
              src="@/assets/images/card_choose_quiz.png"
              :width="105*1.5"
              :height="82*1.5"
              alt="Card image"
              class='object-content '
            /> 
            <div class='flex flex-col gap-6 flex-grow'>
              <h4 class='font-bold text-onBg-dark text-lg sm:text-2xl'>Community and Sharing</h4>
              <p class='text-onBg text-md sm:text-lg'>
              Join a community of learners who share your passion for knowledge. Discuss quiz topics, share insights, and inspire others with your learning journey.
              </p>
            </div>
          </article>
  
        </div>
      </section>
      <section
        class='bg-primary-lt w-full text-onPrimary py-8 px-6 flex flex-col gap-3'
        id='contact'
        >
          <h2
          class='text-2xl font-bold'
          >Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We're here to help. Feel free to reach out to us using the contact information below
          </p>
          <span class='font-bold'>Contact Information:</span>
          <br />
          <ul class='list-disc pl-6'>
            <li>Email: contact@quizlytics.com</li>            
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Quiz Street, Cityville, QZ 98765</li>
          </ul>
        </section>
    </main>
</template>
<style scoped>
 .card_what-we-offer {
    @apply bg-onBg-ltr max-w-2xl rounded-lg py-6 px-4 flex max-sm:flex-col md:flex-row gap-6 justify-center items-stretch max-sm:items-center;
 }
 
 :root {
        --pop-scale: 1;
        --pop-scale-over: 1.1;
    }

    @media screen and (max-width: 420px) {
        :root {
            --pop-scale: 0.5;
            --pop-scale-over: 0.6;
        }
        .highlight__circle {
            scale: var(--pop-scale);
        }

    }

    .highlight__circle-anim {
        animation: pop 1.5s both 
            cubic-bezier(.17,.67,.19,.93);
        transform-origin: bottom left;
    }

    .brand__anim {
        animation: fadeIn 0.8s backwards 
            ease-in-out;
            animation-delay: 300ms;
        transform-origin: top center;
    }

    .button-primary {
        @apply 
        bg-primary text-onPrimary border-b-4 border-primary-dark rounded-md
        transition-colors duration-300 ease-in-out
        hover:bg-primary-dark;
    }

    .highlight__circle-12 {
        @apply top-[60%] left-[78%] ;
    }
    .highlight__circle-156 {
        @apply top-[-40%] left-[100%] ;

    }
    .highlight__circle-36 {
        @apply top-[35%] left-[90%] ;
    }
    .highlight__circle-200 {
        @apply top-[0%] left-[-5%] ;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: scaleY(0%);
        }
        100% {
            opacity: 1;
            transform: scaleY(1);
        }
    }

    @keyframes pop {
        0% {
            scale: 0
        }
        80% {
            scale: var(--pop-scale-over)
            /* scale: var(1.1) */
        }
        100% {
            scalel: var(--pop-scale)
            /* scalel: var(1) */
        }
    }

</style>

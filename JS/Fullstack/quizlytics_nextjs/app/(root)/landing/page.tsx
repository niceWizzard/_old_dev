import WhatPeopleSaySection from '@/components/page/landing/WhatPeopleSaySection'
import { highlightsCircleImageInfo } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
    return (
      <main 
      className="">
        <HighlightsSection/>
        <BenefitsCardSection/>
        <WhatWeOfferSection/>
        <WhatPeopleSaySection />
  
        <ContactsSection/>
      </main>
    )
  }
  

function WhatWeOfferSection() {
    return (
      <section
      className='px-6 my-10 '
      >
          <h2 className='font-bold text-onBg-dark text-2xl md:text-3xl'>What We Offer</h2>
        <div
        className='mt-3 flex flex-col items-center gap-4'
        >
          <article
          className='bg-onBg-ltr max-w-2xl rounded-lg py-6 px-4 flex max-sm:flex-col md:flex-row gap-6 justify-center items-stretch max-sm:items-center'
          >
            <Image
              src="/images/card_interactive_learning.png"
              width={92*1.5}
              height={81*1.5}
              alt="Card image"
              className='object-content w-max '
            /> 
            <div className='flex flex-col gap-6 flex-grow'>
              <h4 className='font-bold text-onBg-dark text-lg sm:text-2xl'>Choose Your Quiz</h4>
              <p className='text-onBg text-md sm:text-lg'>
              Browse through our diverse collection of quizzes covering a wide range of topics. Select the quiz that piques your interest or aligns with your learning goals.
              </p>
            </div>
          </article>
          <article
          className='bg-onBg-ltr max-w-2xl rounded-lg py-6 px-4 flex max-sm:flex-col md:flex-row gap-6 justify-center items-stretch max-sm:items-center'
          >
            <Image
              src="/images/card_community.png"
              width={90*1.5}
              height={107*1.5}
              alt="Card image"
              className='object-content w-max '
            /> 
            <div className='flex flex-col gap-6 flex-grow'>
              <h4 className='font-bold text-onBg-dark text-lg sm:text-2xl'>Interactive Learning</h4>
              <p className='text-onBg text-md sm:text-lg'>
              Engage with the quiz questions in an interactive format. Each question isn't just a test; it's an opportunity to explore concepts and dive deeper into the subject matter.
              </p>
            </div>
          </article>
          <article
          className='bg-onBg-ltr max-w-2xl rounded-lg py-6 px-4 flex max-sm:flex-col md:flex-row gap-6 justify-center items-stretch max-sm:items-center'
          >
            <Image
              src="/images/card_choose_quiz.png"
              width={105*1.5}
              height={82*1.5}
              alt="Card image"
              className='object-content w-max '
            /> 
            <div className='flex flex-col gap-6 flex-grow'>
              <h4 className='font-bold text-onBg-dark text-lg sm:text-2xl'>Community and Sharing</h4>
              <p className='text-onBg text-md sm:text-lg'>
              Join a community of learners who share your passion for knowledge. Discuss quiz topics, share insights, and inspire others with your learning journey.
              </p>
            </div>
          </article>
  
        </div>
      </section>
   )
  }
  
  
  
  
  function HighlightsSection() {
    return (
      <section
        className='py-16 ext-center relative overflow-hidden'
        >
          <div
          className='flex px-6  flex-col gap-6 items-center text-center'
          >
            <h2
            className='text-2xl font-extrabold text-onBg-dark'
            >
              <span className='text-primary text-3xl inline-block brand__anim'>
                Empowering Curiosity
              </span>        
              <br />
              Explore, Learn, and Analyze
            </h2>
            <span
            className='max-w-[250px] text-sm'
            >
              Fueling your quest for knowledge through interactive exploration and insightful analysis
            </span>
            <Link 
            href="/sign-up"
            className='button-primary px-6 py-3 rounded-md font-bold text-2xl max-w-sm '
            >Get Started</Link>
          </div>
            {
            highlightsCircleImageInfo.map((val, index) => (
                <Image
                  aria-hidden
                  style={{animationDelay: `${(index+1) * 0.15}s`}}
                  className={` highlight__circle absolute z-[-10] select-none  highlight__circle-anim translate-x-[-50%] translate-y-[50%] highlight__circle-${val}`}
                  src="/images/circle.png"
                  width={val}
                  height={val}
                  alt="Circle"
                />
            ))
          }
        </section>
    )
  }
  
  function BenefitsCardSection() {
    return (
      <section
        className='px-6 py-2 flex flex-row justify-center gap-6 items-center flex-wrap w-full'
        >
          <article
          className='bg-onBg-ltr py-4 px-6 rounded-lg max-w-[300px]'
          >
            <h3
            className='text-xl font-extrabold text-onBg-dark'
            >Unlock Your Mind's Potential</h3>
            <p>
            Discover a new dimension of learning and fun with Quizlytics - where quizzes evolve into insights.
            </p>
          </article>
          <article
          className='bg-onBg-ltr py-4 px-6 rounded-lg max-w-[300px]'
          >
            <h3
            className='text-xl font-extrabold text-onBg-dark'
            >Quizzes Reimagined, Knowledge Amplified</h3>
            <p>
            Elevate your learning experience with Quizlytics, where quizzes fuse with analytics to provide you with meaningful insights.
            </p>
          </article>
          <article
          className='bg-onBg-ltr py-4 px-6 rounded-lg max-w-[300px]'
          >
            <h3
            className='text-xl font-extrabold text-onBg-dark'
            >
              Quiz, Learn, Analyze: All in One Place
            </h3>
            <p>
            Dive into the world of knowledge exploration with Quizlytics, the app that transforms quizzes into pathways to deeper insights.
            </p>
          </article>
        </section>
    )
  }
  
  
  function ContactsSection() {
    return (
      <section
        className='bg-primary-lt w-full text-onPrimary py-8 px-6 flex flex-col gap-3'
        id='contact'
        >
          <h2
          className='text-2xl font-bold'
          >Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We're here to help. Feel free to reach out to us using the contact information below
          </p>
          <span className='font-bold'>Contact Information:</span>
          <ul className='list-disc pl-6'>
            <li>Email: contact@quizlytics.com</li>            
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Quiz Street, Cityville, QZ 98765</li>
          </ul>
        </section>
    )
  }
  
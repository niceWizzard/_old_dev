import Link from "next/link"

const page = () => {
  return (
    <main
    >
        <div
        className="p-6 flex flex-col gap-4 items-center"
        >
            <div className="max-w-2xl flex flex-col gap-4 ">

                <section
                className="px-6 py-4 bg-onBg-ltr rounded-lg "
                >
                    <h4 className="mb-3 sm:text-2xl text-xl font-bold text-onBg-dark text-center">Our Mission</h4>
                    <p className="sm:text-lg" >At Quizlytics, our mission is to transform the way people engage with knowledge. We believe that learning is a lifelong journey fueled by curiosity, exploration, and meaningful insights. Our goal is to bridge the gap between traditional quizzes and in-depth understanding, making learning not just informative, but also enlightening and enjoyable.</p>
                </section>
                <section
                >
                    <h4 className="mb-3 sm:text-2xl text-lg font-bold text-onBg-dark">Learn More About Quizlytics</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="px-4 py-2 rounded-md bg-onBg-ltr font-medium text-lg" >Facebook Page</Link>
                        <Link href="/" className="px-4 py-2 rounded-md bg-onBg-ltr font-medium text-lg" >Twitter</Link>
                        <Link href="/" className="px-4 py-2 rounded-md bg-onBg-ltr font-medium text-lg" >Reddit</Link>
                    </div>
                </section>
            </div>
        </div>

        <section
        className="p-6 bg-primary-lt text-onPrimary flex justify-center"
        >
            <div
            className="flex flex-col gap-4 max-w-2xl"
            >
                <h4 className="text-onPrimary font-bold text-2xl sm:text-4xl">Join us</h4>
                    
                <p className="sm:text-lg">Join us in redefining the way we learn, explore, and analyze knowledge. Together, let's unlock the potential of quizzes to illuminate the pathways to understanding.</p>
                <Link href="/sign-up" className="bg-primary-ltr px-4 py-2 text-onBg font-bold text-lg rounded-md self-end" >Join Now</Link>
            </div>
        </section>
    </main>
  )
}

export default page
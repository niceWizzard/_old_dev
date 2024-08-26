import Link from "next/link"

const Footer = () => {
  return (
    <footer 
    className="w-full px-6 mt-10 py-2"
    >
      <section>
        <h4
        className="text-primary-dark font-extrabold text-xl my-2"
        >
          Quizlytics
        </h4>
        <hr
        className="border-onBg"
        />
        <div
        className="flex flex-row flex-wrap items-start gap-20 my-4"
        >
          <div
          className="flex flex-col gap-1 py-4 font-semibold text-onBg"
          >
            <Link href="/about" >About Us</Link>
            <Link href="/#contact" >Contact Us</Link>
            <Link href="/" >Privacy Policy</Link>
            <Link href="/" >Terms & Conditions</Link>
            <Link href="/" >Sitemap</Link>
          </div>
          <div
          className="flex flex-col gap-1 py-4 font-semibold text-onBg"
          >
            <Link href="/" >Reddit</Link>
            <Link href="/" >Facebook</Link>
            <Link href="/" >Twitter</Link>
          </div>
        </div>
        <div
        className="flex flex-col sm:items-center"
        >
          <span>
            Quizlytics &copy; {new Date().getFullYear()}
          </span>
          <span>
            Made by CoderRM
          </span>
        </div>
      </section>
    </footer>
  )
}

export default Footer
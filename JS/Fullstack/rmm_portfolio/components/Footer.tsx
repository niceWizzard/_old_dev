import Link from "next/link"

const Footer = () => {
  return (
    <div
    className="border-t border-brand-secondary p-3 flex flex-wrap flex-col"
    >
      <h4
      className="text-center "
      >RMM &copy; {new Date().getFullYear()}</h4>
      <div className="flex justify-end">
        <div className="flex underline">
          <Link href="/" >Github</Link>

        </div>
      </div>
    </div>
  )
}

export default Footer
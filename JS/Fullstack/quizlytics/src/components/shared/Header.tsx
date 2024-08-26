import Link from "next/link"
import { useSession,signOut } from 'next-auth/react'
import RequireAuth from "./RequireAuth"
import HeaderMenu from "../HeaderMenu"

const Header = () => {

  return (
    <header
    className="w-full h-[10vh]"
    >
        <nav
        className="px-6 py-3 w-full h-full flex flex-row justify-between items-center"
        >
            <Link href="/">
              <h2
              className="text-xl font-extrabold text-primary-dark"
              >Quizlytics</h2>
            </Link>
            <div className="max-sm:hidden">
              <RequireAuth >
                <button onClick={() => signOut()}>
                  Logout
                </button>
              </RequireAuth>
            </div>
            <HeaderMenu></HeaderMenu>
        </nav>
    </header>
  )
}

export default Header
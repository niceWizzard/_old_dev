import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container py-2 flex justify-between items-center">
        <Link href="/" className="font-bold text-3xl">
          Job Board
        </Link>
        <nav className="flex gap-4 *:py-2 *:px-4 *:rounded-lg ">
          {!user ? (
            <Link className="bg-gray-200" href={signInUrl} target="_blank">
              Login
            </Link>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-gray-200 py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </form>
          )}
          <Link className="bg-blue-600 text-white" href="/new-listing">
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

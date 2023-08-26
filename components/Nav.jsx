"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 p-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptsVille</p>
      </Link>

      {/* DESKTOP NAVIGATION  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <Link href="/auth" className="black_btn">
            Sign In
          </Link>
        )}
      </div>

      {/* MOBILE NAVIGATION  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div className="relative w-8 h-8 rounded-full outline outline-offset-1">
              <Image
                fill
                src={session?.user.image}
                alt="profile"
                className="rounded-full hover:cursor-pointer"
                onClick={() => {
                  setToggleDropdown((prevToggle) => !prevToggle);
                }}
              />
            </div>

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="black_btn mt-5 w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth" className="black_btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;

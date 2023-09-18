"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [userImage, setUserImage] = useState("");
  const pathname = usePathname();

  const getUserImage = useCallback(async () => {
    try {
      const reponse = await fetch(`profile/api/${session?.user?.id}`);
      const data = await reponse.json();

      setUserImage(data.image);
    } catch (error) {
      console.log(error);
    }
  }, [session?.user?.id]);

  if (session?.user?.id) {
    getUserImage();
  }

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
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <div className="relative w-8 h-8 rounded-full outline outline-offset-1">
                <Image
                  fill
                  sizes="100%"
                  src={userImage || session?.user.image}
                  alt="profile"
                  className="rounded-full"
                />
              </div>
            </Link>
          </div>
        ) : (
          pathname !== "/auth" && (
            <Link href="/auth" className="black_btn">
              Sign In
            </Link>
          )
        )}
      </div>

      {/* MOBILE NAVIGATION  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div className="relative w-8 h-8 rounded-full outline outline-offset-1">
              <Image
                fill
                sizes="100%"
                src={userImage || session?.user.image}
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
          pathname !== "/auth" && (
            <Link href="/auth" className="black_btn">
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Nav;

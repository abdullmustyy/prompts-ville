import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }) => {
  return (
    <section className="">
      <Link href="/" className="flex gap-2 flex-center absolute left-8 top-8 z-10">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptsVille</p>
      </Link>
      <main>{children}</main>
    </section>
  );
};

export default AuthLayout;

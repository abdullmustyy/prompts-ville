"use client"

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";

const CreatePromptButton = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div>
      {session?.user?.id && pathname !== "/create-prompt" && (
        <Link href="/create-prompt">
          <FaCirclePlus className="fixed right-4 bottom-4 md:text-5xl text-[2.5rem] text-primary-orange" />
        </Link>
      )}
    </div>
  );
};

export default CreatePromptButton;

"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaSquarePen, FaTrash } from "react-icons/fa6";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card group">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="relative w-10 h-10 rounded-full outline outline-offset-1">
            <Image
              width={40}
              height={40}
              src={post.creator.image}
              alt="user_image"
              className="rounded-full object-fill w-10 h-10"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.displayName}
            </h3>
            <p className="font-inter text-sm text-gray-500 truncate">
              @{post.creator.userName}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="bg-[#dce6ff]/50 hover:bg-[#dce6ff] px-2 w-fit rounded-md cursor-pointer transition-all"
      >
        <p className="font-inter text-sm blue_gradient">{post.tag}</p>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-end gap-2 border-t border-gray-100 pt-3">
          <FaSquarePen
            onClick={handleEdit}
            className="cursor-pointer text-[1.3rem] text-green-500/70 hover:text-green-500 transition-all"
          />
          <FaTrash
            onClick={handleDelete}
            className="cursor-pointer text-[1.3rem] text-primary-orange/70 hover:text-primary-orange transition-all"
          />
        </div>
      )}
    </div>
  );
};

export default PromptCard;

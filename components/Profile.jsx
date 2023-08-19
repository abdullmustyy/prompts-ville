import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PromptCard from "./PromptCard";

const Profile = ({ desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const user = data[0]?.creator;

  return (
    <section className="w-full">
      <div className="flex items-center gap-4">
        <div className="outline outline-offset-2 rounded-full">
          <Image
            src={user?.image}
            width={100}
            height={100}
            alt="User Image"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="blue_gradient text-xl font-bold">
            {user?.displayName}
          </span>
          <span className="text-black text-base font-light">
            @{user?.userName}
          </span>
        </div>
        {session?.user.id === user?._id && pathName === "/profile" && (
          <Link
            href={`/profile/edit/${user?._id}`}
            className="black_btn ml-auto"
          >
            Edit profile
          </Link>
        )}
      </div>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;

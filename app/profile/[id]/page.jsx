"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const { data: session } = useSession();
  const { replace } = useRouter();

  if (session?.user.id === params.id) replace("/profile");

  const [userPost, setUserPost] = useState([]);
  const userName = userPost[0]?.creator?.userName;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUserPost(data);
    };

    if (params.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Below are the exceptional prompts that ${userName} has shared.`}
      data={userPost}
    />
  );
};

export default UserProfile;

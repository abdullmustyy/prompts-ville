import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthForm from "@components/AuthForm";

const AuthPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const { from } = searchParams;

  if (session) redirect(from || "/");

  return <AuthForm from={from} />;
};

export default AuthPage;

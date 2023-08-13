import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthForm from "@components/AuthForm";

const AuthPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <AuthForm />;
};

export default AuthPage;

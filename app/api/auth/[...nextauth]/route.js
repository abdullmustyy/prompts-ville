import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  // callbacks: {
  //   async session({ session }) {
  //     const sessionUser = await User.findOne({ email: session.user.email });
  //     session.user.id = sessionUser._id.toString();
  //     return session;
  //   },
  //   async signIn({ profile }) {
  //     try {
  //       await connectToDB();
  //       //   Check if user already exists
  //       const userExists = await User.findOne({ email: profile.email });
  //       //   If not, create a new one
  //       if (!userExists) {
  //         await User.create({
  //           email: profile.email,
  //           userName: profile.name.replace(" ", "").toLowerCase(),
  //           image: profile.picture,
  //         });
  //       }
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize({ email, password }, req) {
        try {
          await connectToDB();

          const user = await User.findOne({ email });
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!user || !isPasswordCorrect) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error in CredentialsProvider: ", error);
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
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      let password;

      if (profile) {
        password = profile.family_name.toLowerCase() + "1";
        const hashedPassword = await bcrypt.hash(password, 12);

        profile.password = hashedPassword;
      }

      try {
        await connectToDB();
        //   Check if user already exists
        const userExists = profile
          ? await User.findOne({ email: profile.email })
          : true;
        //   If not, create a new one
        if (!userExists) {
          await User.create({
            email: profile.email,
            displayName: profile.given_name.toLowerCase(),
            userName: profile.name.replace(" ", "").toLowerCase(),
            password: profile.password,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import {
  AuthOptions,
  getServerSession as nextAuthGetServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectionDb, User } from "../db";
import { comparePassword } from "@/utils/utils";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        await connectionDb();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          return null;
        }

        const isMatch = await comparePassword(
          credentials?.password || "",
          user.password,
        );
        if (!isMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  theme: {
    colorScheme: "light",
    brandColor: "blue",
  },
};

function getServerSession() {
  return nextAuthGetServerSession(authOptions);
}

export { authOptions, getServerSession };

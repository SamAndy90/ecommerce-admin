import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { User as UserType } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { mongoConnect } from "lib/mongo-connect";
import User from "models/User";
import bcrypt from "bcrypt";
import clientPromise from "lib/mongo-client";

const adminEmails = ["stadnyk.andy@gmail.com", "stadnikbogdanka@gmail.com"];

export const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, newSession }) {
      if (adminEmails.includes(session?.user?.email!)) {
        return session;
      } else {
        return newSession;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        const pass = credentials?.password;
        const email = credentials?.email;

        await mongoConnect();
        const user = await User.findOne({ email });
        const isOk = user && bcrypt.compareSync(pass!, user?.password);

        const { password, ...userWithoutPass } = user?._doc;

        if (isOk) return userWithoutPass as UserType;
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

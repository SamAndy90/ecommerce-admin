import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongoConnect } from "lib/mongo-connect";
import Admin, { type AdminType } from "models/Admin";
import bcrypt from "bcrypt";
import clientPromise from "lib/mongo-client";

const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password: pass } = credentials!;

        await mongoConnect();
        const user = await Admin.findOne<AdminType>({ email });
        if (!user)
          throw new Error(
            "This user isn`t admin. Please request access from the admin."
          );

        const isPasswordCorrect = await bcrypt.compare(pass!, user.password);
        if (!isPasswordCorrect)
          throw new Error("Password is not correct. Please try again");

        const { password, ...userWithoutPass } = JSON.parse(
          JSON.stringify(user)
        );
        return userWithoutPass;
      },
    }),
  ],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") {
        const newData = JSON.parse(session.config.data);
        token.name = newData.name;
        token.email = newData.email;
        token.picture = newData.image;
      }
      return token;
    },
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

import User from "@models/user";
import { connectToDb } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user!.email,
      });
      const _user = session.user as any;
      _user.id = sessionUser!._id.toString();
      console.log("LSKJDF ", _user);
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDb();
        const userExists = await User.findOne({
          email: profile!.email,
        });
        if (!userExists) {
          await User.create({
            email: profile!.email,
            username: profile!.name?.replaceAll(" ", ""),
            image: profile!.image,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

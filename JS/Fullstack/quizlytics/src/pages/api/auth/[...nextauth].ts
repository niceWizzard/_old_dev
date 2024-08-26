import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { parse, serialize } from "cookie";
import prisma from "@/lib/prisma.server";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: "LSDLFJL(PDlkjliDS()l",
};

export default (req: any, res: any) =>
  NextAuth(req, res, {
    callbacks: {
      async signIn({ email, user, profile }) {
        const { signin_type } = parse(req.headers.cookie);

        let a = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (a == null) {
          if (signin_type != "register") {
            return "/signin?error=not_registered";
          }
          a = await prisma.user.create({
            data: {
              email: user.email!,
            },
          });
        }
        if (profile) {
          profile.id = a?.id!;
        }
        return true;
      },

      async jwt({ token, profile }) {
        if (profile) {
          token.userId = profile.id;
        }
        return token;
      },

      async session({ session, token, user }) {
        if (token && session.user) {
          session.user.id = token.userId;
        }
        return session;
      },
    },

    ...authOptions,
  });

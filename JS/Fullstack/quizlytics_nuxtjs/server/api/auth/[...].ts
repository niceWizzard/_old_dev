import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  secret: "2d2b2e2f2g2h2i2j2k2l2m2n2o2p2q2r2s2t2u2v2w2x2y2z",
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: useRuntimeConfig().public.providers.google.clientId,
      clientSecret: useRuntimeConfig().public.providers.google.clientSecret,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        console.log("FETCHING", process.server);
        const url = new URL("http://localhost:3000/api/users/create");
        try {
          const user = await prisma.user.upsert({
            where: {
              email: profile?.email!,
            },
            include: {
              createdClasses: true,
              enrolledClasses: true,
              posts: true,
            },
            update: {},
            create: {
              email: profile?.email!,
            },
          });
          token.id = user.id;
        } catch (err) {
          const error = err as Error;
          console.log("ERROR HAPPENED", error.message);
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

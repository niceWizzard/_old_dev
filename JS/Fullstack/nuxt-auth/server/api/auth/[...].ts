import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
export default NuxtAuthHandler({
  secret: "lkjdslkfjlksjdf09LKDJSFLKSJD",
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: "Iv1.9fab83264de506ab",
      clientSecret: "291a24555bedf16c21ff2b2713736954c619cf52",
    }),
  ],
});

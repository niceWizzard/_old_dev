import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import useUserData from '~/composables/useUserData'

const config = useRuntimeConfig()
export default NuxtAuthHandler({
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
           clientId: config.app.github.clientId!,
           clientSecret: config.app.github.clientSecret!,
        })
    ],
    secret: "klasdfklasdKJJXLI123sddqweSXDC123klfsdaj",
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
              token.accessToken = account.access_token
              token.id = (profile as any).id
            }
            return token
          },
          async session({ session, token, user }) {
            var s = session as any;
            // Send properties to the client, like an access_token and user id from a provider.
            s.accessToken = token.accessToken
            s.user.id = token.id
            return session
          }
    }
})
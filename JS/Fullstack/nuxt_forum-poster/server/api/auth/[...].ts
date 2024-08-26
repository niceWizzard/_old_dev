import {NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'

const {github, authSecret} = useRuntimeConfig()
export default NuxtAuthHandler({
    secret: authSecret,
    pages: {
        signIn: '/login'
    },
    providers: [
        // @ts-expect-error
        GithubProvider.default({
            clientId : github.client,
            clientSecret : github.secret,
        })
    ]
})
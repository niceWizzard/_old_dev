import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import NextAuth, {  } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { cookies } from "next/headers"
import { NextApiRequest, NextApiResponse } from "next"



const handler = async (req : NextApiRequest, res: NextApiResponse) => {
    const cookie = cookies()
    const supabase = createRouteHandlerClient({
        cookies: () => cookie
    })
    return  await NextAuth(req, res,{
       
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string,
            }),
        ],
        callbacks: {
            async session(params) {
                const userCheck = 
                    await supabase.from('user').select("*").eq('email', params.token.email);
                (params.session as any).onboarded = (userCheck.data?.length != 0)
                console.log("SESSIOn")
                return params.session
            },
        }
        
    })
}

export { handler as GET, handler as POST }
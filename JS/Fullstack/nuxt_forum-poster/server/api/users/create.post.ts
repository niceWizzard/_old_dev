import { getServerSession } from "next-auth"
import { useNuxtApp } from "nuxt/app"
import { UserModel } from "~/server/models/UserModel"

export default defineEventHandler(async (event) => {
  const auth =  await getServerSession()
  if(!auth) {
    return {
      status: 401,
      body: 'Unauthorized'
    }
  }
  const { name} = await readBody(event)
  const user = useNuxtApp().$userModel as UserModel;
  
  return {
    status: 200,
    body: `Hello ${name}`
  }
})

import type { UserModel } from "~/server/models/UserModel"


const excludedRoutes = ['/onboarding', '/login']

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("ON BOARDING MIDDLEWARE")
    if(!import.meta.server) {
        return
    }
    if(excludedRoutes.includes(to.path)) {
        return
    }
    const {data: {value : auth}} = useAuth()
    const userModel = useNuxtApp().$userModel as UserModel;

    const user = await userModel.getUserByEmail(auth?.user?.email ?? "")
    if(user != null) {
        return
    }

    return navigateTo('/onboarding')
})

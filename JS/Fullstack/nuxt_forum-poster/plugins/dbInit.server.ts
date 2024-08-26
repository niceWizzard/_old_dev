import { useLogger } from 'nuxt/kit'
import { UserModel } from '~/server/models/UserModel'
import db from '~/server/utils/db'


export default defineNuxtPlugin((nuxtApp) => {
    const {database} = db()
    console.info('Database initialized.')
    nuxtApp.provide('userModel', new UserModel(database))
    console.info("UserModel provided.")
})

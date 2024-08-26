// import { currentUser } from '@clerk/nextjs'
// import { User } from '@clerk/nextjs/server'
// import {redirect} from 'next/navigation'
// import UserModel from '@/models/user.model'

// function createUser(user : User | null) {
//     UserModel.create({
//         id: user?.id,
//         accountType: "free"
//     })
// }

// const Page = async () => {

//     createUser(await currentUser())
//     redirect('/')

// }

// export default Page
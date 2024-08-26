import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment"
import { fetchThread } from "@/lib/actions/thread.action"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"


interface Props {
    params : {id: string}
}

const Page = async ({params} : Props) => {

    if(!params.id) return null

    const user = await currentUser()

    if(!user) return null

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded ) redirect('/onboarding')

    const thread = await fetchThread(params.id)

  return (
    <section className="relative">
        <div>
            <ThreadCard 
                key={thread._id}
                id={thread._id}
                userId={user?.id ?? ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                />
        </div>
        <div className="mt-7">
            <Comment
            threadId={thread.id}
            currentUserImg={userInfo?.image ?? ""}
            currentUserId={JSON.stringify(userInfo._id)}

            />
        </div>

        <div className="mt-10">
            {
                thread.children.map((thread: any) => (
                    <ThreadCard 
                        key={thread._id}
                        id={thread._id}
                        userId={user?.id ?? ""}
                        parentId={thread.parentId}
                        content={thread.text}
                        author={thread.author}
                        community={thread.community}
                        createdAt={thread.createdAt}
                        comments={thread.children}
                        isComment
                        />
                ))
            }
        </div>

    </section>
  )
}

export default Page
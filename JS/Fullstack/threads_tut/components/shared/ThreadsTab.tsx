import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"


interface Props {
    userId: string,
    accountId: string,
    accountType: string,
}

const ThreadsTab = async ({
    userId,
    accountId,
    accountType,
}: Props) => {

    const results = await fetchUserPosts(accountId)

    if(!results)redirect("/")



  return (
    <section
    className="mt-9 flex flex-col gap-10"
    >
        {
            results.threads.map((thread: any) => (
                <ThreadCard 
                key={thread._id}
                  id={thread._id}
                  userId={userId}
                  parentId={thread.parentId}
                  content={thread.text}
                  author={accountType === "User" ? 
                  {name: results.name, image: results.image, id: results.id } : 
                    {name: thread.author.name, image: thread.author.image, id: thread.author.id}
                    } // TOdo
                  community={thread.community} // TOdo
                  createdAt={thread.createdAt}
                  comments={thread.children}
                />
            ))
        }
    </section>
  )
}

export default ThreadsTab
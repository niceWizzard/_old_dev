import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth, getAuth } from "@clerk/nextjs/server";
import Link from "next/link";
import { getImages } from "~/server/db/queries/images";

export const dynamic = "force-dynamic";

async function Images() {
  const user = auth();
  if (!user.userId) return <div>no user</div>;
  const images = await getImages({ userId: user.userId });
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((v) => (
        <div key={v.id.toString() + v.url} className="w-64">
          <Link href={`/images/${v.id}`}>
            <img src={v.url} alt="image" className="w-48 object-contain" />
          </Link>
          <span className="break-words">{v.name}</span>
        </div>
      ))}
      {images.length == 0 && <div>No images. Upload something.</div>}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="text-2xl font-semibold">Please sign in </div>
      </SignedOut>
      <SignedIn>
        <div className="container p-6">
          <Images />
        </div>
      </SignedIn>
    </main>
  );
}

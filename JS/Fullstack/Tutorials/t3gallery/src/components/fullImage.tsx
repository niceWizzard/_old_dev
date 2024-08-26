import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/db/queries/images";
import ImageDeleteButton from "./image-delete-btn";

export default async function FullPageImagePreview({ id }: { id: string }) {
  console.log("ASKING FOR IMAGE ID ", id);
  const image = await getImage({ id: parseInt(id) });
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full p-2">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className=" object-contain" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col items-stretch border-l">
        <span className="border-b text-center text-xl">{image.name}</span>
        <div className="flex flex-col gap-6 p-4">
          <span>Uploaded by {uploaderInfo.fullName} </span>
          <span>Created at {new Date(image.createdAt).toLocaleString()} </span>
          <ImageDeleteButton id={image.id} action={deleteImage} />
        </div>
      </div>
    </div>
  );
}

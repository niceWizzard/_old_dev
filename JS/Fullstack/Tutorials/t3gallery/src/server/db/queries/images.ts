"use server";
import "server-only";

import { db } from "..";
import { auth } from "@clerk/nextjs/server";
import { images } from "../schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getImages({ userId }: { userId: string }) {
  return await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (model, { eq }) => eq(model.userId, userId),
  });
}

export async function getImage({ id }: { id: number }) {
  const user = auth();
  if (!user.userId) throw new Error("No user");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("No image");

  if (image.userId !== user.userId) throw new Error("Not your image");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("No user");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("No image");

  if (image.userId !== user.userId) throw new Error("Not your image");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
  revalidatePath("/");
  redirect("/");
}

"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { LoadingSvg } from "~/app/_components/simple-upload-button";

const ImageDeleteButton = ({
  action,
  id,
}: {
  action: (id: number) => Promise<void>;
  id: number;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      action={async () => {
        action(id);
      }}
      onSubmit={() => {
        setIsSubmitting(true);
      }}
    >
      <Button type="submit" variant="destructive">
        {isSubmitting ? (
          <span>
            <LoadingSvg /> Deleting...
          </span>
        ) : (
          <span>Delete</span>
        )}
      </Button>
    </form>
  );
};

export default ImageDeleteButton;

import React from "react";
import FullPageImagePreview from "~/components/fullImage";

function PhotoModal({ params: { id } }: { params: { id: string } }) {
  return <FullPageImagePreview id={id} />;
}

export default PhotoModal;

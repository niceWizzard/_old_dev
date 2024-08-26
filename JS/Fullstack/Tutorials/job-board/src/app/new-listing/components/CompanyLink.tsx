"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

const CompanyLink = ({ href, children }: Props) => {
  const [hasClicked, setHasClicked] = useState(false);
  return (
    <Link
      href={href}
      className="p-2 border rounded-md flex items-center gap-2"
      onClick={() => setHasClicked(true)}
    >
      {!hasClicked ? children : "Loading..."}
      <FontAwesomeIcon icon={faArrowRight} className="h-4" />
    </Link>
  );
};

export default CompanyLink;

"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import NewCompany from "../page";

type Props = {
  action: (data: FormData) => Promise<void>;
};

const CreateCompanyForm = ({ action }: Props) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const NewCompany = useRef<HTMLInputElement>(null);
  return (
    <form
      action={(e) => {
        action(e);
      }}
      onSubmit={(e) => {
        if (!NewCompany.current?.value) {
          e.preventDefault();
          return;
        }
        setHasSubmitted(true);
      }}
      className="flex gap-2"
    >
      <input
        ref={NewCompany}
        name="new-company"
        type="text"
        placeholder="Company name"
        className="p-2 border border-gray-400 rounded-md"
      />
      <button
        className="bg-gray-200 px-4 py-2 rounded-md flex gap-2 items-center"
        type="submit"
      >
        {!hasSubmitted ? (
          <div>
            Create a company{" "}
            <FontAwesomeIcon icon={faArrowRight} className="h-4" />
          </div>
        ) : (
          <span>Creating....</span>
        )}
      </button>
    </form>
  );
};

export default CreateCompanyForm;

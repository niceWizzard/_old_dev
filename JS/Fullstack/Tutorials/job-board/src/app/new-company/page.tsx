import React from "react";
import { createCompany } from "../new-listing/actions/createCompany";
import { getUser } from "@workos-inc/authkit-nextjs";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateCompanyForm from "./components/CreateCompanyForm";

const NewCompany = async () => {
  const { user } = await getUser();

  if (!user) {
    return <div>You need to be login.</div>;
  }

  return (
    <div className="container">
      <h2 className="text-lg ">Create a new company</h2>
      <p className="text-gray-500">
        To create a job listing, you first need to register a company.
      </p>
      <CreateCompanyForm
        action={async (data) => {
          "use server";
          await createCompany(data, user.id);
        }}
      />
    </div>
  );
};

export default NewCompany;

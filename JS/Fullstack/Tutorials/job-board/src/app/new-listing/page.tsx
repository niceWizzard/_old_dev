import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";
import React from "react";
import { KeyValuePair } from "tailwindcss/types/config";
import CompanyLink from "./components/CompanyLink";

const NewListing = async () => {
  const { user } = await getUser();
  if (!user) {
    return <div>You need to be login.</div>;
  }

  const workOs = new WorkOS(process.env.WORKOS_API_KEY);

  const organizationMemberships =
    await workOs.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const organizationNames: KeyValuePair<string, string> = {};
  for (const org of organizationMemberships.data.filter(
    (v) => v.status == "active"
  )) {
    organizationNames[org.id] = (
      await workOs.organizations.getOrganization(org.organizationId)
    ).name;
  }

  return (
    <div className="container flex flex-col gap-2">
      <h2 className="text-lg ">Your companies</h2>
      <p className="text-gray-500">Select a company</p>
      <div className="flex flex-col gap-2">
        {Object.keys(organizationNames).map((orgId) => (
          <CompanyLink href={`/new-listing/${orgId}`}>
            {organizationNames[orgId]}
          </CompanyLink>
        ))}
      </div>
      {organizationMemberships.data.length == 0 && (
        <div className="border border-blue-300 bg-blue-50 p-4 rounded-md">
          No companies found
        </div>
      )}

      <Link
        className="bg-gray-200 px-4 py-2 rounded-md mt-6 inline-flex items-center gap-2"
        href="/new-company"
      >
        Create a company
        <FontAwesomeIcon icon={faArrowRight} className="h-4" />
      </Link>
    </div>
  );
};

export default NewListing;

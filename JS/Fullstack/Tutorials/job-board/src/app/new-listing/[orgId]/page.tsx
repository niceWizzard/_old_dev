import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import React from "react";

interface PageProps {
  params: {
    orgId: string;
  };
}

const NewListing = async ({ params: { orgId } }: PageProps) => {
  const { user } = await getUser();
  if (!user) {
    return <div>Please log in.</div>;
  }
  const workOs = new WorkOS(process.env.WORKOS_API_KEY);

  const userOrganizations =
    await workOs.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  const foundOrganization = userOrganizations.data.find((v) => v.id == orgId);
  const hasAccess = foundOrganization != null;

  if (!hasAccess) {
    return "No access";
  }

  return (
    <form action="" className="container">
      <input type="text" className="border p-2" placeholder="Job title" />
    </form>
  );
};

export default NewListing;

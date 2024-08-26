import { WorkOS } from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCompany = async (
  formData: FormData,
  userId: string
): Promise<void> => {
  const workOs = new WorkOS(process.env.WORKOS_API_KEY);

  const org = await workOs.organizations.createOrganization({
    name: formData.get("new-company") as string,
  });
  await workOs.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: "admin",
  });
  revalidatePath("/new-listing");
  redirect("/new-listing");
};

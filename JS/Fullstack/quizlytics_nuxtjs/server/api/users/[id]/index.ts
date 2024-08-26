import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (id == null) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: {
        message: `Id is not supplied. Received: ${id}`,
      },
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return {
    success: true,
    data: {
      user,
    },
  };
});

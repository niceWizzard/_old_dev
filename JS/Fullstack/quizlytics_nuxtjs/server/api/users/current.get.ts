import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const data = await getServerSession(event);

  if (data?.user == null) {
    setResponseStatus(event, 401);
    return {
      success: false,
      error: {
        message: "Authentication required.",
      },
      data: null,
    };
  }
  const deepIncludeOfClass = {
    posts: true,
    quizzes: true,
    students: true,
    teacher: true,
  };
  const user = await prisma.user.findFirst({
    where: {
      id: (data.user as any).id,
    },
    include: {
      createdClasses: {
        include: deepIncludeOfClass,
      },
      enrolledClasses: { include: deepIncludeOfClass },
      posts: {
        include: {
          assignedClass: true,
          poster: true,
        },
      },
    },
  });
  if (user == null) {
    setResponseStatus(event, 404);
    return {
      success: false,
      error: {
        message: "User not found.",
      },
      data: null,
    };
  }

  return {
    success: true,
    data: user,
  };
});

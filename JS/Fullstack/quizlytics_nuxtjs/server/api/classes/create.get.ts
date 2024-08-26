import { getServerSession } from "#auth";
import { H3Event, EventHandlerRequest } from "h3";

function Response(
  event: H3Event<EventHandlerRequest>,
  {
    success,
    data,
    error,
    statusCode,
  }: {
    success: boolean;
    error?: { id?: string; message: string };
    data?: Record<string, any>;
    statusCode?: number;
  }
) {
  setResponseStatus(event, statusCode ?? 200);
  return {
    success,
    error,
    data,
  };
}

export default defineEventHandler(async (event) => {
  const data = await getServerSession(event);

  if (!data?.user) {
    return Response(event, {
      statusCode: 401,
      success: false,
      error: {
        message: "You must be logged in to create a class",
      },
    });
  }

  const user = data?.user! as any;
  type BodyEvent = { studentsId: string[] } & Record<string, any>;

  const { name, section, studentsId } = (await readBody(event)) as BodyEvent;

  if (!name || !section || !studentsId) {
    return Response(event, {
      success: false,
      error: {
        message: "Missing required fields",
      },
    });
  }

  const c = await prisma.class.create({
    data: {
      name: "alksdjfalskd",
      students: {
        connect: studentsId.map((id) => ({ id })),
      },
      teacher: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      posts: true,
      quizzes: true,
      students: true,
      teacher: true,
    },
  });

  return Response(event, {
    success: true,
    data: c,
  });
});

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event);

  if (email == null) {
    return {
      success: false,
      error: {
        message: `Email is not supplied. Received: ${email}`,
      },
    };
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: email.toString(),
      },
    });

    return {
      success: true,
      data: {
        user,
      },
    };
  } catch (error) {
    const err = error as any;
    console.log("ERROR HAPPNEED!", err.name);
    let returnError = {
      code: err.code ?? null,
      message: err.message,
    };
    switch (err.code) {
      case "P2002":
        returnError.message = "Email already exists.";
    }

    return {
      success: false,
      error: returnError,
    };
  }
});

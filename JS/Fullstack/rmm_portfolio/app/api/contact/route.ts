import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";
import { RateLimiter } from "limiter";

const verifyRecaptcha = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_TOKEN}&response=${token}`,
    }).then((res) => res.json());

    return res && res.success && res?.score > 0.5;
  } catch (err) {
    return false;
  }
};

const limiter = new RateLimiter({
  interval: "min",
  tokensPerInterval: 2,
  fireImmediately: true,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const haveTokens = limiter.tryRemoveTokens(1);

  if (!haveTokens) {
    return NextResponse.json(
      {
        message: "Too many request. Try again after a minute",
      },
      {
        status: 429,
      }
    );
  }

  const body = await req.json();

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { message: "Missing parameters. " },
      { status: 403 }
    );
  }

  if (body.recaptchaToken == null) {
    return NextResponse.json(
      { message: "Missing recaptcha. " },
      { status: 403 }
    );
  }

  const isTokenValid = await verifyRecaptcha(body.recaptchaToken);
  if (!isTokenValid) {
    return NextResponse.json(
      { message: "Invalid recaptcha. " },
      { status: 403 }
    );
  }
  const { email, text } = body;

  if (!email || !text) {
    return NextResponse.json(
      { message: "Invalid parameters. " },
      { status: 403 }
    );
  }
  console.log("SENDING EMAIL");
  emailjs.init({
    publicKey: "27hRrFjl80h5l6Of5",
    privateKey: "GOLyWzFEgeNhBrGfhlPFm",
  });
  const resp = await emailjs.send("service_qz2n5at", "template_gfwgsyp", {
    email,
    text,
  });

  if (resp.status != 200) {
    return NextResponse.json(
      {
        message: "Email limit has been reached. Please try again tomorrow.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ message: "Successfully sent!" });
}

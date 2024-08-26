import Hero from "@/app/components/Hero";
import Jobs from "@/app/components/Jobs";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
} from "@workos-inc/authkit-nextjs";
export default async function Home() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  return (
    <>
      <Hero />
      <Jobs />
    </>
  );
}

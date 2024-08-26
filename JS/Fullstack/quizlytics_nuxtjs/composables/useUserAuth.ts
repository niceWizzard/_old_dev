import { Session } from "next-auth";

type UserE = Session & { user?: Session["user"] & { id: string } };

export function useUserAuth() {
  const { data, ...rest } = useAuth();
  const userData = data.value as UserE | null | undefined;

  return {
    userData,
    data,
    ...rest,
  };
}

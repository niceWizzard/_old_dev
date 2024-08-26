import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }

  interface Profile {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

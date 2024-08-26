import { defineStore } from "pinia";
import { User as U, Prisma, PrismaClient } from "@prisma/client";

type User = Prisma.UserGetPayload<{
  include: {
    createdClasses: true;
    enrolledClasses: true;
    posts: true;
  };
}>;
export const useUserStore = defineStore("user", {
  state: (): User => ({
    createdClasses: [],
    posts: [],
    email: "",
    id: "",
    enrolledClasses: [],
  }),
  actions: {
    setUser(user: User) {
      this.$state = user;
    },
    async fetch() {
      const headers = useRequestHeaders(["cookie"]) as HeadersInit;
      const res = await $fetch("/api/users/current", { headers });
      if (res.data == null) {
        console.log(res.error.message);
        return;
      }
      this.setUser(res.data);
    },
  },
});

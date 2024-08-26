import { PrismaClient } from "@prisma/client";
import { create } from "zustand";

interface UserStore {
  enrolledClasses: any[];
  createdClasses: any[];
  posts: any[];
}

export const useUserStore = create<UserStore>((set) => ({
  enrolledClasses: [],
  createdClasses: [],
  posts: [],
}));

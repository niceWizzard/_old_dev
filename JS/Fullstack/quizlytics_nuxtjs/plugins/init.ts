import { useUserStore } from "~/store/userStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { data } = useAuth();
  if (!data.value?.user) {
    return;
  }
  await useUserStore().fetch();
});

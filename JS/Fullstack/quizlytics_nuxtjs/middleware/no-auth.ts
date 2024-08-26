export default defineNuxtRouteMiddleware(function (to, from) {
  const { data } = useAuth();
  if (data.value?.user != null) {
    return navigateTo("/");
  }
});

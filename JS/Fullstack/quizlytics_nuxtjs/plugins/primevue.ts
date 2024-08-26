import Button from "primevue/button";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";
import Ripple from "primevue/ripple";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { pt: Tailwind });
  nuxtApp.vueApp.directive("ripple", Ripple);
  nuxtApp.vueApp.component("Button", Button);
});

<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import formatStuff from "@/utilities/format-stuff";
import { useRoute, useRouter } from "vue-router";

const { formCloudflareImageSized } = formatStuff();

const { initDefaultSport } = useDefaultSport();
const router = useRouter();
const route = useRoute();

function shouldFetch() {
  return route.name == "home";
}

const goHome = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  initDefaultSport(shouldFetch());
  router.push({ name: "home" });
};
</script>
<template>
  <div class="cursor-pointer flex items-center" @click="goHome">
    <!-- <img src="/Main2.svg" class="absolute h-full w-full inset-0" /> -->
    <!-- <VerticalLogo /> -->
    <img
      :src="formCloudflareImageSized('7fd0073a-6cbd-41db-cbdd-0ef423e78000', 288, 96)"
      :srcset="`${formCloudflareImageSized('7fd0073a-6cbd-41db-cbdd-0ef423e78000', 288, 96)} 1x, ${formCloudflareImageSized('7fd0073a-6cbd-41db-cbdd-0ef423e78000', 576, 192)} 2x`"
      alt="Hakibets logo"
      width="144"
      height="48"
      class="h-7 sm:w-36 sm:h-12"
      fetchpriority="high"
      decoding="async"
    />
    <!-- <img src="/Main.svg" class="absolute h-full w-full inset-0" /> -->
    <!-- <img
      v-if="isDark"
      src="/logo-dark.png"
      class="w-20 h-6 sm:w-40 sm:h-10 fill-black"
      alt="dark-logo"
    />
    <img
      v-else
      src="/logo-light.png"
      class="w-20 h-6 sm:w-40 sm:h-10 fill-white"
      alt="light-logo"
    /> -->
  </div>
</template>

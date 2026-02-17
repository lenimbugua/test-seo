<script setup>
import { useRouter, useRoute } from "vue-router";
import { useDefaultSport } from "@/composables/useDefaultSport";

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
  <div class="cursor-pointer" @click="goHome">
    <div>
      <img
        src="/logo-light.png"
        class="w-16 h-6 sm:w-40 sm:h-10 fill-black"
        alt="logo"
      />
    </div>
  </div>
</template>

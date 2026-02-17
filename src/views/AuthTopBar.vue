<script setup>
// import { computed } from "vue";
// import { useRoute } from "vue-router";
// import ChevronLeftIcon from "@/components/ChevronLeftIcon.vue";
// const route = useRoute();
// const title = computed(() => route.meta.title);
</script>
<template>
  <div
    class="w-full text-lg font-bold bg-gray-100 dark:bg-black/15 p-3 border-b dark:border-dark-purple-18"
  >
    <div class="flex items-center justify-between max-w-[1680px] mx-auto">
      <RouterLink :to="{ name: 'home' }">
        <TheLogo />
      </RouterLink>
      <!-- <div
        class="flex flex-grow justify-center items-center text-gray-700 dark:text-white"
      >
        {{ title }}
      </div> -->
      <div class="flex items-center justify-center">
        <div class="flex items-center"><ThemeSwitch /></div>
      </div>
    </div>
  </div>
</template>

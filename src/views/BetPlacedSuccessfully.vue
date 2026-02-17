<script setup lang="ts">
import HeaderLinks from "../components/HeaderLinks.vue";
import MobileFooter from "../components/MobileFooter.vue";
</script>

<template>
  <LazyInfinityScroll>
    <div class="sticky top-0 z-[50]">
      <HeaderLinks />
    </div>
    <div
      class="h-full flex flex-col bg-white dark:bg-[#241E34]"
    >
      <div class="">
        <BetPlaced />
      </div>
    </div>
    <MobileFooter />
  </LazyInfinityScroll>
</template>

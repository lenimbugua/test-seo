<script setup>
import SidebarTabs from "./SidebarTabs.vue";
import SideGames from "./SideGames.vue";

</script>

<template>
  <div class="sticky z-[2] w-[16rem] top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
    <SidebarTabs />
    <SideGames />
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

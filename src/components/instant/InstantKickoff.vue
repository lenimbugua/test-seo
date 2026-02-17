<script setup>
import { useInstantStore } from "@/stores/instant";

const { fetchInstantLive, setViewToDisplay } = useInstantStore();

function fetchLive() {
  setViewToDisplay("live");
  fetchInstantLive();
}
</script>
<template>
  <div
    class="uppercase cursor-pointer text-black dark:text-white flex items-center w-full justify-center"
    @click="fetchLive"
  >
    <div class="w-full flex items-center py-2.5 justify-center bg-[#009260]">
      <span class="text-sm font-bold text-white">Kick Off</span>
    </div>
  </div>
</template>

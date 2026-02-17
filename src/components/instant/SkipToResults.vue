<script setup>
import { useInstantStore } from "@/stores/instant";

const { skipToResults } = useInstantStore();
</script>
<template>
  <div
    class="uppercase fixed bottom-0 text-black dark:text-white flex items-center w-full justify-center"
    @click="skipToResults"
  >
    <div class="w-full flex items-center py-2.5 justify-center bg-[#009260]">
      <span class="text-sm font-bold text-white">Skip To Results</span>
    </div>
  </div>
</template>

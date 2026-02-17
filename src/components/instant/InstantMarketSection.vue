<script setup>
import MoreMarkets from "./MoreMarkets.vue";
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";
const { selectedCompetition } = storeToRefs(useInstantStore());
</script>

<template>
  <div
    class="w-full max-w-5xl overflow-scroll flex border-t border-[#FFC400] pt-3 pb-2 bg-[#EFEDED] dark:bg-[#241E34] justify-between items-center px-4"
  >
    <div class="text-black dark:text-white text-md font-bold capitalize">
      {{ selectedCompetition.name }}
    </div>
    <div class="flex">
      <InstantMarkets />
      <MoreMarkets />
    </div>
  </div>
</template>

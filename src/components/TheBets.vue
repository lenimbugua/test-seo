<script setup>
import { storeToRefs } from "pinia";
import { useBetsStore } from "../stores/bets";
import BetsLoader from "./BetsLoader.vue";

const { pending, bets } = storeToRefs(useBetsStore());
</script>
<template>
  <BetsLoader v-if="pending" />
  <div
    v-else-if="!bets.length"
    class="flex w-full h-52 justify-center items-center"
  >
    <div>
      <div class="noData"></div>
      <div class="w-full text-center text-gray-950 dark:text-slate-50">
        No data
      </div>
    </div>
  </div>
  <div v-else>
    <div
      v-for="bet in bets"
      :key="bet.id"
      class="w-full block border dark:bg-white/5 dark:border-dark-purple-18 rounded-lg text-xs p-1 px-3 font-medium dark:text-gray-300/90 my-3"
    >
      <TheBet :bet="bet" />
    </div>
  </div>
</template>

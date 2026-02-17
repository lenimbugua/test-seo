<script setup>
import { useBetsStore } from "@/stores/bets";
import { toRefs } from "vue";

const { fetchBets } = useBetsStore();
const { bets } = toRefs(useBetsStore());
fetchBets(1);
</script>
<template>
  <div class="text-xs font-bold p-0.5 text-red-50">{{ bets.length }}</div>
</template>

<script setup>
import { useShareBetStore } from "@/stores/sharebet.js";
import { storeToRefs } from "pinia";
const { setStake } = useShareBetStore();

const { stake, possibleWin, totalOdds } = storeToRefs(useShareBetStore());
</script>

<template>
  <div class="p-2 bg-gray-200 dark:bg-[#37304B]">
    <div class="text-center text-gray-700 dark:text-slate-400 text-xs font-bold pb-0">Example Bet</div>
    <div class="pb-2">
      <TheStake :set-stake :stake :total-odds />
    </div>
    <BetslipBonus :total-odds :possible-win :stake />
    <div class="p-4 pb-0">
      <PossibleWin :possible-win :stake :total-odds />
    </div>
  </div>
</template>

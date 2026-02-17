<script setup>
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import BetslipLoadCode from "./BetslipLoadCode.vue";
</script>

<template>
  <div class="bg-white dark:bg-dark-purple-20 p-3">
    <div class="flex w-full justify-center items-center">
      <div class="noDataSm"></div>
    </div>
    <div>
      <div class="w-full flex items-center justify-center space-x-1">
        <div>
          <InformationCircleIcon class="h-4 w-4 text-[#FEAF04]" />
        </div>
        <h3
          class="text-center text-xs text-gray-700 dark:text-slate-300 font-semibold"
        >
          Your betslip is empty!
        </h3>
      </div>
      <div class="w-52 mx-auto">
        <p class="text-xs text-center text-gray-700 dark:text-slate-500">
          Add bets or enter booking code.
        </p>
      </div>
    </div>
    <BetslipLoadCode />
  </div>
  <BetControls />
</template>

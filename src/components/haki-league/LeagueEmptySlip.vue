<script setup lang="ts">
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div
    class="h-full flex flex-col items-center bg-white dark:bg-dark-purple-20 p-3"
  >
    <div class="flex w-full justify-center items-center">
      <div class="noData"></div>
    </div>
    <div>
      <div class="w-full flex items-center justify-center space-x-1">
        <div>
          <InformationCircleIcon class="h-4 w-4 text-[#FEAF04]" />
        </div>
        <h3
          class="text-center text-medium text-gray-700 dark:text-slate-300 font-semibold"
        >
          Your betslip is empty!
        </h3>
      </div>
      <div class="w-52 mx-auto">
        <p class="text-xs text-center text-gray-700 dark:text-slate-500">
          Select matches to place bets.
        </p>
      </div>
    </div>
  </div>
</template>

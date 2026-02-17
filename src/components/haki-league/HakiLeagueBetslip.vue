<script setup lang="ts">
import LeagueEmptySlip from "./LeagueEmptySlip.vue";
</script>

<template>
  <div class="relative w-[21rem]">
    <div
      class="w-full sticky top-20 rounded-t-lg overflow-clip sm:px-0 border dark:border-white/5"
    >
      <div
        class="h-[calc(100vh-6rem)] flex flex-col bg-white dark:bg-black/15 rounded-t-lg border-b dark:border-black"
      >
        <div
          :class="[
            'w-full cursor-pointer py-2 text-lg text-center font-extrabold',
            'focus:outline-none',
            'dark:bg-[#37304B] bg-gray-200 dark:text-gray-200 text-gray-900 shadow',
          ]"
        >
          Betslip
        </div>
        <div class="flex-grow overflow-y-scroll scrollbar-hide">
          <LeagueEmptySlip />
        </div>
        <LeagueBetControls />
      </div>
    </div>
  </div>
</template>

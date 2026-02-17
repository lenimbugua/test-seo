<script setup>
import { ArrowDownOnSquareStackIcon } from "@heroicons/vue/24/outline";

import { useLoadCode } from "../composables/useLoadCode";
import TheButtonSpin from "./TheButtonSpin.vue";

const {
  loadCode,
  setIntention,
  loadSlipIsPending,
  //   viewSlipIsPending,
  isToLoadCode,
  //   isToViewCode,
  bookingCode,
} = useLoadCode();

function isValidBookingCode(code) {
  return code.length === 8;
}
</script>
<template>
  <form class="p-4" @submit.prevent="loadCode">
    <div class="mb-2">
      <label
        for="bookingCode"
        class="block text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400"
        >Have a Booking Code? Enter it here.</label
      >
      <input
        id="bookingCode"
        v-model="bookingCode"
        required
        type="text"
        class="mt-1 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019]/50 rounded-md block w-full p-2 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 shadow focus:ring-[#36C31F] ring-2 ring-black/10 dark:ring-white/25"
      />
    </div>
    <div class="w-full flex items-center justify-between space-x-2">
      <button
        type="submit"
        :class="[
          isValidBookingCode(bookingCode)
            ? 'cursor-pointer bg-[#36C31F]'
            : 'cursor-not-allowed bg-gray-300 dark:bg-white/25',
        ]"
        class="flex flex-grow space-x-1 items-center justify-center p-2 shadow rounded-md font-medium"
        @click="setIntention(isToLoadCode)"
      >
        <TheButtonSpin v-if="loadSlipIsPending" />
        <div v-else class="flex items-center justify-between space-x-1">
          <ArrowDownOnSquareStackIcon class="h-4 w-4" />
          <span class="text-sm">Load Code</span>
        </div>
      </button>
    </div>
  </form>
</template>

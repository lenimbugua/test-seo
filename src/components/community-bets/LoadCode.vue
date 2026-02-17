<script setup>
import {
  ArrowDownOnSquareStackIcon,
  //   EyeIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";

import { useLoadCode } from "@/composables/useLoadCode";

const {
  loadCode,
  setIntention,
  loadSlipIsPending,
  //   viewSlipIsPending,
  isToLoadCode,
  //   isToViewCode,
  bookingCode,
} = useLoadCode();
</script>
<template>
  <form
    class="bg-gray-200 dark:bg-white/10 rounded-lg p-4 max-w-sm mx-auto"
    @submit.prevent="loadCode"
  >
    <div class="mb-4">
      <label
        for="bookingCode"
        class="block text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400"
        >Enter the Booking Code</label
      >
      <input
        id="bookingCode"
        v-model="bookingCode"
        required
        type="text"
        placeholder="eg. PK45J6"
        class="mt-1 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019]/50 rounded-md block w-full px-3 h-14 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 shadow-md focus:ring-[#36C31F] ring-2 ring-[#36C31F]/50"
      />
    </div>
    <div class="w-full flex items-center justify-between space-x-2">
      <!-- <button
        type="submit"
        class="flex space-x-1 items-center p-2 w-1/2 text-[#36C31F] rounded-md border-2 h-14 shadow-md border-[#36C31F] font-semibold"
        @click="setIntention(isToViewCode)"
      >
        <TheButtonSpin v-if="viewSlipIsPending" />

        <EyeIcon v-else class="h-5 w-5" /> <span>Preview</span>
      </button> -->
      <button
        type="submit"
        class="text-white flex space-x-1 items-center p-2 w-full h-14 shadow-lg rounded-md border border-[#56CB05] bg-[#1C7928] font-bold"
        @click="setIntention(isToLoadCode)"
      >
        <TheButtonSpin v-if="loadSlipIsPending" />

        <div v-else class="flex items-center space-x-2">
          <ArrowDownOnSquareStackIcon class="h-5 w-5" />
          <span>Load Code</span>
        </div>
      </button>
    </div>
    <div class="mt-4 text-slate-400 flex space-x-2">
      <div>
        <InformationCircleIcon class="h-6 w-6 text-yellow-500" />
      </div>
      <p class="text-gray-600 dark:text-slate-400">
        A booking code enables you to book a bet. Odds or availabilities may
        change
      </p>
    </div>
  </form>
</template>

<script setup>
import formatStuff from "@/utilities/format-stuff";
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";
import TheButtonSpin from "../TheButtonSpin.vue";
// import PotentialEarnings from "./PotentialEarnings.vue";

const { formattedNumber } = formatStuff();
const { earnings, withdrawPending } = storeToRefs(useAffiliateStore());
const { withdrawAffiliateEarnings } = useAffiliateStore();
</script>
<template>
  <div
    class="flex flex-col justify-between p-4 md:px-8 bg-gradient-to-t from-[#56CB05] via-yellow-500 to-amber-500 mt-3 rounded-md"
  >
    <div class="flex justify-between">
      <ArrowTrendingUpIcon class="text-white stroke-2 w-6 h-6" />
      <h2 class="text-white text-xl font-semibold">My Stats</h2>
    </div>
    <div class="text-center py-3">
      <h1 class="font-black text-5xl">
        {{ formattedNumber(earnings?.earnings?.totalEarnings) }}
      </h1>
      <div class="text-white">Total earnings</div>
    </div>
    <div class="flex space-x-6 justify-between items-center">
      <!-- <div class="text-center">
        <div class="font-bold">100.00</div>
        <div class="font-bold text-xs text-gray-600 py-2">Today</div>
      </div> -->
      <div class="text-center">
        <div class="font-bold">
          {{ formattedNumber(earnings?.earnings?.currentWeekEarnings) }}
        </div>
        <div class="font-bold text-xs text-white py-2">This Week</div>
      </div>
      <div class="text-center">
        <div class="font-bold">
          {{ formattedNumber(earnings?.earnings?.availableForWithdraw) }}
        </div>
        <button
          class="font-bold text-xs p-2 rounded-md bg-amber-800 shadow text-white"
          @click="withdrawAffiliateEarnings"
        >
          <TheButtonSpin v-if="withdrawPending" />
          <span v-else>Withdraw</span>
        </button>
      </div>
    </div>
    <!-- <PotentialEarnings /> -->
  </div>
</template>

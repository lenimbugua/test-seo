<script setup>
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import formatStuff from "../utilities/format-stuff";
const { formattedNumber } = formatStuff();

defineProps({
  totalOdds: {
    type: Number,
    default: 0,
  },
  possibleWin: {
    type: Number,
    default: 0,
  },
  stake: {
    type: Number,
    default: 0,
  },
});

const showTax = ref(false);
</script>
<template>
  <div class="text-sm">
    <div class="flex items-center justify-between" @click="showTax = !showTax">
      <div
        :class="['dark:text-[#56CB05] text-gray-700']"
        class="font-semibold text-sm flex items-center space-x-1"
      >
        <span>Potential Win</span>
        <!-- <ChevronUpIcon v-if="showTax" class="w-5 h-5" />
        <ChevronDownIcon v-else class="w-5 h-5" /> -->
      </div>
      <div class="flex items-center space-x-1">
        <div
          :class="['dark:text-gray-100 text-gray-800']"
          class="font-black text-base"
        >
          {{ formattedNumber(possibleWin) }}
          <!-- {{ possibleWin.toFixed(2) }} -->
        </div>
        <span class="text-xs dark:text-slate-400">KES</span>
      </div>
    </div>
  </div>
  <!-- <div v-if="showTax" class="mt-2">
    <BetslipTaxInfo :stake :total-odds :possible-win />
  </div> -->
</template>

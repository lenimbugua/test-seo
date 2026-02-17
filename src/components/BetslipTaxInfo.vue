<script setup>
import { useTax } from "@/composables/useTax.js";

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

const {
  calculateExciseTax,
  calculateWithhodingTax,
  //   calculatePossibleWinAfterExciseTax,
  //   finalAmountAfterWithHoldingTax,
} = useTax();
</script>
<template>
  <div class="text-xs text-gray-600 dark:text-slate-400 space-y-2">
    <div class="flex justify-between">
      <div>Excise Tax:</div>
      <div>{{ formattedNumber(calculateExciseTax(stake)) }} KES</div>
    </div>
    <div class="flex justify-between">
      <div>With Holding Tax:</div>
      <div>{{ formattedNumber(calculateWithhodingTax(stake, totalOdds)) }} KES</div>
    </div>
    <div class="flex justify-between">
      <div>Possible Winnings:</div>
      <div>
        <!-- {{ calculatePossibleWinAfterExciseTax(stake, totalOdds).toFixed("2") }} -->
        {{ formattedNumber(possibleWin) }}

        KES
      </div>
    </div>

    <!-- <div class="flex justify-between">
      <div>Final Amount (After Taxes):</div>
      <div>
        KES {{ finalAmountAfterWithHoldingTax(stake, totalOdds).toFixed("2") }}
      </div>
    </div> -->
  </div>
</template>

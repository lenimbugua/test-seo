<script setup>
import { useBetslip } from "@/composables/useBetslip";
import { useMultibetBonus } from "@/composables/useMultibetBonus";

import { useModalTypes } from "@/composables/useModalTypes";
import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

import { useModalStore } from "@/stores/modal";

const { multibetBoostModal } = useModalTypes();

const { openModal } = useModalStore();

const { betslip, stake } = toRefs(useBetslipStore());

const { calculatePossibleWin } = useBetslip();

const {
  getNextBoost,
  getCurrentBoost,
  getLegsToNextBonus,
  calculateBoostBonus,
} = useMultibetBonus();
</script>
<template>
  <div
    class="flex justify-between overflow-clip rounded-t-lg text-gray-50 text-xs font-black px-2  bg-gradient-to-r from-green-700 via-red-700 via-50% to-green-700"
    @click="openModal(multibetBoostModal)"
  >
    <div v-if="getCurrentBoost() > 0">
      Boost
      <span class="font-bold"
        >{{ getCurrentBoost() }}% (KSH
        {{
          calculateBoostBonus(calculatePossibleWin(betslip, stake)).toFixed(
            "2"
          )
        }})</span
      >
    </div>
    <div class="flex items-center space-x-2">
      <div class="font-bold">
        Add {{ getLegsToNextBonus() }} more get {{ getNextBoost() }}% boost!
      </div>
    </div>
  </div>
</template>

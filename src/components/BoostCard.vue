<script setup>
import { computed } from "vue";

import { useMultibetBonus } from "@/composables/useMultibetBonus";

import { useBetslip } from "@/composables/useBetslip";

import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

import { useOneCut } from "../composables/useOneCut";

import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import formatStuff from "../utilities/format-stuff";
const { oneCut } = useModalTypes();

const { openModal } = useModalStore();

const { formattedNumber } = formatStuff();

const { betslip, stake, possibleWin } = toRefs(useBetslipStore());

const { calculatePossibleWin } = useBetslip();
// const { calculatePossibleWin } = useBetslip();

const { qualifyingLegs, MIN_LEGS } = useOneCut();

const {
  getNextBoost,
  getCurrentText,
  getLegsToNextBonus,
  //   calculateBoostBonus,
} = useMultibetBonus();

const primary = "#241E34";
const secondary = "#4A9827";
const accent = "#FEAF04";

const progress = computed(() =>
  Math.min((qualifyingLegs() / MIN_LEGS) * 100, 100)
);
const progressBarWidth = computed(() => `${progress.value}%`);

function oneCutReady() {
  if (qualifyingLegs() >= MIN_LEGS) {
    return true;
  }
  return false;
}

// const boostedPayout = computed(() =>
//   Math.round(props.currentPayout * (1 + props.bonusPercent / 100))
// );
</script>
<template>
  <div
    class="relative pb-8 w-full max-w-md mx-auto p-2 rounded-t-2xl text-center text-white overflow-hidden"
    :style="{ backgroundColor: primary }"
    @click="openModal(oneCut)"
  >
    <!-- Flashing Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-[#FEAF04] via-[#4A9827] to-[#FEAF04] animate-gradient-x opacity-30 blur-lg"
    ></div>

    <div class="relative z-10 space-y-1">
      <!-- Boost Header -->
      <h2 class="text-lg font-extrabold animate-pulse drop-shadow-lg">
        <!-- ⚡🔥 BOOST YOUR SLIP! 🎉  -->
        {{ getCurrentText() }}
      </h2>
      <span class="animate-blink text-lg" :style="{ color: accent }">
        Add {{ getLegsToNextBonus() }} more get {{ getNextBoost() }}% boost!
      </span>

      <!-- Payout Section -->
      <div
        class="text-sm whitespace-nowrap font-bold flex justify-center items-center gap-2"
      >
        💵 Current payout:
        <span class="text-sm" :style="{ color: accent }">
          {{ formattedNumber(calculatePossibleWin(betslip, stake)) }}
        </span>
        → After boost:
        <span class="text-lg font-bold" :style="{ color: secondary }">
          {{ possibleWin }}

          <!-- <RollingNumber :value="boostedPayout" /> -->
        </span>
      </div>

      <!-- Progress Section -->
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <div class="flex text-md font-bold text-amber-300">
            <div>1 Cut Win</div>
            <div class="text-white">
              <OneCutIcon />
            </div>
          </div>
          <div v-if="oneCutReady()">🔥 One Cut ready ✅</div>
          <div v-else class="flex items-center">
            Progress:
            <div class="flex">
              <span class="font-bold" :style="{ color: accent }">
                {{ qualifyingLegs() }} / {{ MIN_LEGS }}
              </span>
              – 🚀Almost there!
            </div>
          </div>
        </div>
        <div class="w-full h-2 z-[1] bg-[#372A4F] rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-500 ease-out"
            :style="{
              width: progressBarWidth,
              background: `linear-gradient(to right, ${accent}, ${secondary})`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 4s ease infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
.animate-blink {
  animation: blink 1s step-start infinite;
}
</style>

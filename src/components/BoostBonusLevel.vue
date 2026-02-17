<script setup>
import { PercentBadgeIcon } from "@heroicons/vue/20/solid";

// import { useBetslip } from "@/composables/useBetslip";
import { useMultibetBonus } from "@/composables/useMultibetBonus";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import MultibetBoost from "./MultibetBoost.vue";

// import { useModalTypes } from "@/composables/useModalTypes";
import {
  // toRefs,
  ref,
} from "vue";
// import { useBetslipStore } from "../stores/sports-betslip";

// import { useModalStore } from "@/stores/modal";

// const { multibetBoostModal } = useModalTypes();

// const { openModal } = useModalStore();

// const { betslip, stake } = toRefs(useBetslipStore());

// const { calculatePossibleWin } = useBetslip();

const {
  getNextBoost,
     getCurrentBoost,
  getLegsToNextBonus,
  //   calculateBoostBonus,
} = useMultibetBonus();

const showMultibetBoost = ref(false);
</script>
<template>
  <div class="flex items-center">
    <PercentBadgeIcon class="text-green-100 h-8 w-8" />

    <!-- <OneCutIcon /> -->
    <div class="w-full relative h-5 bg-green-300 rounded-full overflow-hidden">
      <span class="absolute z-[50] text-[0.6rem] top-[0.1rem] px-2"
        >select {{ getLegsToNextBonus() }} more game (odds ≥ 1.2), get a
        {{ getNextBoost() }}% reward raise</span
      >
      <div
        class="h-full bg-lime-600 transition-all duration-300 tex-xs"
        :style="{ width: getCurrentBoost() + '%' }"
      ></div>
    </div>
    <div @click="showMultibetBoost = !showMultibetBoost">
      <ChevronDownIcon
        v-if="!showMultibetBoost"
        class="text-green-100 h-7 w-7"
      />
      <ChevronUpIcon v-else class="text-green-100 h-7 w-7" />
    </div>
  </div>
  <MultibetBoost v-if="!showMultibetBoost" />
</template>

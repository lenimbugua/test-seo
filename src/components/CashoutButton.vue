<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
// import { ArrowUturnLeftIcon } from "@heroicons/vue/20/solid";
import { useCashoutStore } from "../stores/cashout.js";

import { useModalStore } from "@/stores/modal";

import { storeToRefs } from "pinia";
import { useBetsStore } from "../stores/bets";

const { openModal } = useModalStore();

const { cashout } = useModalTypes();

const { getCashoutValue, setBetId } = useCashoutStore();
const { pending, responseOK } = storeToRefs(useCashoutStore());
const { selectedId } = storeToRefs(useBetsStore());
const { setSelectedBet } = useBetsStore();

const props = defineProps({
  betId: {
    type: Number,
    required: true,
  },
  cashoutAllowed: {
    type: Boolean,
    required: true,
  },
});

async function handleCashout() {
  setSelectedBet(props.betId);

  await getCashoutValue(props.betId);
  if (responseOK.value) {
    setBetId(props.betId);
    openModal(cashout);
    return;
  }
}
</script>
<template>
  <div
    v-if="cashoutAllowed"
    class="flex space-x-1 items-center font-bold cursor-pointer p-1 border border-green-600 text-black rounded-md"
    @click="handleCashout"
  >
    <div v-if="pending && selectedId === betId" class="px-3 text-black">
      <TheButtonSpin color="text-black" />
    </div>
    <div v-else class="flex items-center gap-1">
      <!-- <ArrowUturnLeftIcon class="w-4 h-4 mb-0.5 stroke-width-4" /> -->
      <div class="flex gap-1 items-center text-slate-300">
        <div class="text-xs">Cashout</div>
        <div class="text-amber-500">20 KES</div>
      </div>
      <div class="flex gap-1">
        <button class="bg-green-600 rounded-md">
          <span class="text-xs tracking-wide p-1.5">Instant</span>
        </button>
        <button class="bg-green-600 px-1 rounded-md">
          <span class="text-xs tracking-wide">Auto</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useBetsStore } from "@/stores/bets";
import { useModalStore } from "@/stores/modal";

import { ArrowPathRoundedSquareIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useShareBetStore } from "../stores/sharebet.js";
const { openModal } = useModalStore();
const { betslip } = useModalTypes();

const { selectedId } = storeToRefs(useBetsStore());

const props = defineProps({
  betId: {
    type: Number,
    required: true,
  },
});
const { responseOK } = storeToRefs(useShareBetStore());
const { rebet, loadBetslip } = useShareBetStore();

const rebetPending = ref(false);

const doRebet = async () => {
  rebetPending.value = true;
  await rebet(props.betId);
  if (!responseOK.value) {
    rebetPending.value = false;
    return;
  }
  openModal(betslip);
  loadBetslip();
  rebetPending.value = false;
};
</script>
<template>
  <div
    class="flex space-x-1 items-center font-bold cursor-pointer p-1 rounded-md"
    @click="doRebet"
  >
    <ArrowPathRoundedSquareIcon
      class="w-4 h-4 stroke-width-4"
      :class="{ 'animate-spin': rebetPending && selectedId === props.betId }"
    />
    <span>Rebet</span>
  </div>
</template>

<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useBetBuilderStore } from "../stores/betbuilder";
import { useBetslipStore } from "../stores/sports-betslip.js";
import BetBuilderSelections from "./BetBuilderSelections.vue";
import TheButtonSpin from "./TheButtonSpin.vue";

import { useModalStore } from "@/stores/modal";

const { setCustomIdToRemove, addBetbuilderToBetslip, siblingExists } =
  useBetslipStore();
const props = defineProps({
  parentMatchId: {
    type: String,
    required: true,
  },
});

const selections = computed(() =>
  useBetBuilderStore().getSelectionByParentMatchId(props.parentMatchId)
);

const showSelections = ref(false);

const { decimalPrice, pending } = toRefs(useBetBuilderStore());

function addToSlip(item) {
  item.isBetBuilder = true;

  const sibling = siblingExists(item);
  if (sibling) {
    setCustomIdToRemove(sibling.customId);
    const { confirmRemoveSlipModal } = useModalTypes();
    const { openModal } = useModalStore();
    openModal(confirmRemoveSlipModal);
    return;
  }

  addBetbuilderToBetslip(item, decimalPrice.value);
}

onBeforeUnmount(() => {
  setCustomIdToRemove(null);
});
</script>
<template>
  <div v-if="selections?.selections?.length > 0" class="sticky top-[8rem]">
    <div
      class="w-full flex justify-between items-center dark:bg-[#251E34] p-1 px-3 shadow-2xl border border-white/5"
    >
      <div class="justify-self-start flex items-center gap-1">
        <div
          class="text-amber-50 bg-amber-600 dark:bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg text-center"
        >
          <div v-if="pending" class="flex items-center">
            <TheButtonSpin />
          </div>
          <span v-else>{{ selections.selections.length }}</span>
        </div>
        <!-- <span
          v-if="selections?.selections?.length > 1"
          class="text-gray-600 dark:text-slate-400"
          >Selections</span
        > -->
        <span
          v-if="selections?.selections?.length < 2"
          class="text-gray-600 dark:text-slate-400 text-xs"
          >please add another selection</span
        >
      </div>
      <div
        class="flex items-center justify-self-end gap-2 text-gray-600 dark:text-slate-400"
      >
        <span v-if="selections?.selections?.length > 1" class="text-xs"
          >odds</span
        >
        <span
          v-if="selections?.selections?.length > 1"
          class="font-bold text-lg text-gray-700 dark:text-slate-200"
          >{{ decimalPrice }}</span
        >
        <button
          :disabled="selections?.selections?.length < 2"
          :class="[
            selections?.selections?.length < 2
              ? 'cursor-not-allowed opacity-30'
              : 'cursor-pointer ',
          ]"
          class="text-amber-50 p-1 px-2 rounded-sm bg-amber-600 text-lg font-bold"
          @click="addToSlip(selections)"
        >
          <div v-if="pending" class="flex items-center">
            <TheButtonSpin />
            <span>Loading...</span>
          </div>
          <span v-else>Add to Betslip</span>
        </button>
        <ConfirmModalRemoveSlip :selections />

        <div
          class="cursor-pointer text-gray-600 dark:text-slate-400"
          @click="showSelections = !showSelections"
        >
          <ChevronDownIcon v-if="!showSelections" class="h-6 w-6" />
          <ChevronUpIcon v-if="showSelections" class="h-6 w-6" />
        </div>
      </div>
    </div>
    <BetBuilderSelections
      v-if="showSelections"
      :selections="selections.selections"
    />
  </div>
</template>

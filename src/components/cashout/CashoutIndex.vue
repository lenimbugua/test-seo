<script setup>
import { useCashoutStore } from "@/stores/cashout";
import { useModalStore } from "@/stores/modal";
import { onBeforeUnmount, toRefs } from "vue";
import AutoCashout from "./AutoCashout.vue";
import FullCashout from "./FullCashout.vue";
// import PartialCashout from "./PartialCashout.vue";
import { useBetsStore } from "@/stores/bets";
import { useRoute } from "vue-router";

const { fetchBets, fetchBetslip } = useBetsStore();

const route = useRoute();

const { setSelectedCashout } = useCashoutStore();

const { selectedCashout } = toRefs(useCashoutStore());

const { closeModal } = useModalStore();

function fetchBet() {
  if (route.name === "my-bets") {
    fetchBets(1);
  } else if (route.name === "bet-details") {
    fetchBetslip();
  }
}

onBeforeUnmount(() => {
  fetchBet();
  closeModal();
});
</script>
<template>
  <div
    class="flex w-full justify-center gap-8 border-b-2 border-gray-300 dark:border-gray-900 py-2 px-8"
  >
    <button
      class="p-3 px-4 w-32 shadow-md rounded-md font-semibold text-lg"
      :class="
        selectedCashout === 'instant'
          ? 'bg-green-700 text-white'
          : 'text-green-600'
      "
      @click="setSelectedCashout('instant')"
    >
      Instant
    </button>
    <button
      class="p-3 px-4 w-32 shadow-md rounded-md font-semibold text-lg"
      :class="
        selectedCashout === 'auto'
          ? 'bg-green-700 text-white'
          : 'text-green-600'
      "
      @click="setSelectedCashout('auto')"
    >
      Auto
    </button>
  </div>
  <div v-if="selectedCashout === 'instant'">
    <div class="border-b border-gray-300 dark:border-gray-900 py-3">
      <FullCashout />
    </div>
    <!-- <div class="border-b border-gray-300 dark:border-gray-900 py-3">
      <PartialCashout />
    </div> -->
  </div>
  <AutoCashout v-else />

  <div class="py-8">
    <button
      class="bg-amber-600 text-amber-50 w-1/3 shadow p-2 mx-auto text-center flex justify-center"
      @click="closeModal"
    >
      Close
    </button>
  </div>
</template>

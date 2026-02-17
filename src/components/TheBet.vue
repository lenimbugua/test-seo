<script setup>
import { ShareIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useBetsStatus } from "../composables/useBetsStatus";
import { useBetsStore } from "../stores/bets";
import { useShareBetStore } from "../stores/sharebet.js";
import CashoutStrip from "./CashoutStrip.vue";
// import CancelBetButton from "./CancelBetButton.vue";

const {
  getStatusText,
  getColor,
  pending: betIsOpen,
  cashedOut,
  voided,
  won,
  pendingPayout,
} = useBetsStatus();
const { pending: sharePending } = storeToRefs(useShareBetStore());

const { setSelectedBet } = useBetsStore();
const { selectedId } = storeToRefs(useBetsStore());

defineProps({
  bet: {
    type: Object,
    required: true,
  },
});

function showRebet(status) {
  return ![voided, won, pendingPayout].includes(parseInt(status));
}
</script>
<template>
  <RouterLink
    :to="{ name: 'bet-details' }"
    class="w-full"
    @click="setSelectedBet(bet.betId, bet)"
  >
    <div class="flex items-center justify-between">
      <div
        :class="[
          getColor('text', bet.status),
          'uppercase font-bold tracking-wider',
        ]"
      >
        {{ getStatusText(bet.status) }}
      </div>
      <BetIcon :status="bet.status" />
    </div>
    <div class="bg-gray-200 dark:bg-black/25 p-2 space-y-2 rounded-md">
      <div class="flex justify-between">
        <div>Bet Placed on:</div>
        <div>{{ bet.date }}</div>
      </div>
      <div class="flex justify-between">
        <div>Bet ID</div>
        <div>{{ bet.betRefenceId }}</div>
      </div>
      <div class="flex justify-between">
        <div>Total Games</div>
        <div>{{ bet.totalGames }}</div>
      </div>
      <div class="flex justify-between">
        <div>Stake</div>
        <div>{{ bet.betAmount.toFixed("2") }}</div>
      </div>
      <div class="flex justify-between">
        <div>Total Odds</div>
        <div>{{ bet.totalOdd.toFixed("2") }}</div>
      </div>
      <div class="flex justify-between dark:text-gray-200 font-semibold">
        <div>Possible Win</div>
        <div>{{ bet.possibleWin.toFixed("2") }}</div>
      </div>
      <div
        v-if="bet.status === cashedOut"
        class="flex justify-between dark:text-gray-200 font-semibold"
      >
        <div>Cashed out Amount</div>
        <div>{{ bet?.cashedOutAmount?.toFixed("2") }}</div>
      </div>
    </div>
  </RouterLink>
  <div class="pt-3">
    <CashoutStrip v-if="bet.status === 1 && !bet.isBetBuilder"  :bet="bet" />
    <div class="flex w-full items-center py-3 gap-2">
      <!-- <CashoutButton
          v-if="bet.status === 1"
          :bet-id="bet.betId"
          :cashout-allowed="bet.cashOutAllowed"
        /> -->
      <TheRebet
        v-if="showRebet(bet.status)"
        class="border border-green-600 text-green-600"
        :bet-id="bet.betId"
      />
      <!-- <CancelBetButton
          v-if="bet.status === betIsOpen"
          :bet-id="bet.betId"
          :bet-place-date="bet.date"
        /> -->
      <ShareBet v-if="bet.status === betIsOpen" :bet-id="bet.betId">
        <button
          class="border border-green-500 min-w-16 text-green-600 font-semibold py-1 px-1 rounded-md"
        >
          <TheButtonSpin v-if="sharePending && selectedId === bet.betId" />
          <div v-else class="flex justify-between items-center">
            <ShareIcon class="h-3 w-4" />
            <span class="text-xs">Share</span>
          </div>
        </button>
      </ShareBet>
    </div>
  </div>
</template>

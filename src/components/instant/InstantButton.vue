<script setup>
import { useInstantBetslipStore } from "@/stores/instant-betslip.js";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const props = defineProps({
  outcome: {
    type: Object,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  customId: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  competitionId: {
    type: String,
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
  marketId: {
    type: String,
    required: true,
  },
  marketName: {
    type: String,
    required: true,
  },
  eBlockId: {
    type: String,
    required: true,
  },
});

const { betslip } = storeToRefs(useInstantBetslipStore());
const { addAnItemToBetslip } = useInstantBetslipStore();

const outcomeIsSelected = computed(() => {
  return betslip.value.some((item) => item.customId === props.customId);
});

function handleSelect() {
  const clickIsToSelectOutcome = !outcomeIsSelected.value;
  const outcome = props.outcome;
  const payload = {
    live: 0,
    customId: props.customId,
    home_team: props.homeTeam,
    away_team: props.awayTeam,
    odd_value: outcome.odd_value,
    outcome_id: outcome.outcome_id,
    outcome_name: outcome.outcome_name,
    competition_id: props.competitionId,
    match_id: props.matchId,
    market_id: props.marketId,
    market_name: props.marketName,
    status: outcome.status,
    eBlockId: props.eBlockId,
    clickIsToSelectOutcome,
  };

  addAnItemToBetslip(payload);
}
</script>

<template>
  <button
    :class="[
      outcomeIsSelected
        ? 'bg-[#009260] text-white'
        : 'bg-[#EFEDED] dark:bg-[#504B5C] border-primary-300 dark:border-primary-500/20 sm:hover:bg-accent-500 sm:dark:hover:bg-accent-800',
    ]"
    class="flex-col text-sm justify-center items-center focus:outline-none rounded-md shadow px-3 sm:px-4 p-2"
    @click="handleSelect"
  >
    <!-- <div
      :class="
        outcomeIsSelected
          ? 'text-accent-600 dark:text-accent-600'
          : 'text-primary-500 dark:text-primary-400'
      "
      class="text-xs"
    >
      {{ outcome.outcome_key }}
    </div> -->
    <div
      :class="
        outcomeIsSelected
          ? 'text-accent-700 dark:text-accent-500'
          : 'text-primary-700 dark:text-primary-100'
      "
      class="text-xs font-black w-10 h-5"
    >
      {{ outcome.odd_value }}
    </div>
  </button>
</template>

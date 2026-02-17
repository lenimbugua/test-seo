<script setup>
import { useToast } from "@/composables/useToast";
import { timestamp } from "@vueuse/core";
import { computed, toRefs } from "vue";
import { useBetBuilderStore } from "../stores/betbuilder";
import OddChangeArrow from "./OddChangeArrow.vue";
import ThePadlock from "./ThePadlock.vue";

import { MAX_GAMES } from "../composables/useDefinedConstants.js";

const props = defineProps({
  outcome: {
    type: Object,
    required: true,
  },
  seasonId: {
    type: String,
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
  startTime: {
    type: String,
    required: true,
  },
  competitionId: {
    type: Number,
    required: true,
  },
  subTypeId: {
    type: Number,
    required: true,
  },
  parentMatchId: {
    type: String,
    required: true,
  },
  isMatchDetail: {
    type: Boolean,
    required: false,
    default: false,
  },
  sportId: {
    type: String,
    required: true,
  },
  competitionName: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  sportName: {
    type: String,
    required: true,
  },
  multiBetMarketName: {
    type: String,
    required: true,
  },
  twoGoalUpActive: {
    type: Boolean,
    required: true,
  },
});

const selections = computed(() =>
  useBetBuilderStore().getSelectionByParentMatchId(props.parentMatchId)
);
const {
  addAnItemToSelection,
  // fetchBetBuilderMatches
} = useBetBuilderStore();
const { decimalPrice, pending } = toRefs(useBetBuilderStore());

const { fireErrorToast } = useToast();

const outcomeIsSelected = computed(() => {
  return selections?.value?.selections.some(
    (item) => item.customId === props.customId
  );
});

async function handleSelect() {
  const clickIsToSelectOutcome = !outcomeIsSelected.value;
  const outcome = props.outcome;
  const payload = {
    live: 0,
    customId: props.customId,
    seasonId: props.seasonId,
    homeTeam: props.homeTeam,
    awayTeam: props.awayTeam,
    oddType: outcome.oddType,
    startTime: props.startTime,
    twoGoalUpActive: props.twoGoalUpActive,
    outcomeId: outcome.outcomeId,
    subTypeId: props.subTypeId,
    specifiers: outcome.specifiers,
    status: outcome.status,
    sportId: props.sportId,
    prevOddValue: outcome.preOddValue,
    outcomeName: outcome.outcomeName,
    competitionId: props.competitionId,
    parentMatchId: props.parentMatchId,
    competitionName: props.competitionName,
    countryName: props.countryName,
    sportName: props.sportName,
    multiBetOutcomeName: outcome.multiBetOutcomeName,
    multiBetMarketName: props.multiBetMarketName,
    timestamp: timestamp().toString(),
    clickIsToSelectOutcome,
  };

  if (
    selections?.value?.selections.length >= MAX_GAMES &&
    clickIsToSelectOutcome
  ) {
    fireErrorToast("Betslip limit reached");
    return;
  }

  const payloadWithParentMatchId = {
    payload,
    parentMatchId: props.parentMatchId,
    homeTeam: props.homeTeam,
    awayTeam: props.awayTeam,
    startTime: props.startTime,
  };

  //   await fetchBetBuilderMatches();
  addAnItemToSelection(payloadWithParentMatchId);
  payloadWithParentMatchId.payload.oddValue = decimalPrice.value;
}

function outcomeIsLocked() {
  if (pending.value) return true;
  if (outcomeIsSelected.value) return false;
  return props.outcome.status === -1 || props.outcome.disabled;
}

// console.log(props);
</script>
<template>
  <button
    v-if="!isMatchDetail"
    :disabled="outcomeIsLocked()"
    :class="[
      outcomeIsLocked() ? 'cursor-not-allowed' : 'cursor-pointer',
      outcomeIsSelected
        ? 'bg-[#0F8F21]/80'
        : 'bg-gray-300/70 dark:bg-[#393444]',
    ]"
    class="flex justify-center items-center p-2 h-12 w-16 sm:w-32 shadow-md rounded-md"
    @click="handleSelect"
  >
    <ThePadlock v-if="outcomeIsLocked()" />
    <div v-else class="flex-col justify-center items-center">
      <div
        :class="[
          outcomeIsSelected
            ? 'text-lime-50'
            : 'dark:text-slate-400 text-gray-950',
        ]"
        class="text-xs"
      >
        {{ outcome.outcomeName }}
        <OddChangeArrow
          :pre-odd-value="outcome.preOddValue"
          :odd-value="outcome.oddValue"
        />
      </div>
      <div
        :class="[
          outcomeIsSelected ? 'text-white' : 'dark:text-white text-gray-950',
        ]"
        class="text-[1rem] font-semibold"
      >
        {{ outcome.oddValue }} 
      </div>
    </div>
  </button>
  <button
    v-else
    :disabled="outcomeIsLocked()"
    :class="[
      outcomeIsLocked() ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      outcomeIsSelected
        ? 'bg-[#0F8F21]/80'
        : 'bg-gray-300/80 dark:bg-[#393444]',
    ]"
    class="p-2 text-sm font-extrabold w-full rounded-md"
    @click="handleSelect"
  >
    <!-- <div v-if="outcomeIsLocked()" class="flex justify-center items-center">
      <ThePadlock />
    </div> -->

    <div class="flex flex-col justify-center items-center">
      <div
        :class="[
          outcomeIsSelected
            ? 'text-lime-100'
            : 'dark:text-slate-400 text-gray-700',
        ]"
        class="text-xs"
      >
        {{ outcome.outcomeNameAlias
        }}<OddChangeArrow
          :pre-odd-value="outcome.preOddValue"
          :odd-value="outcome.oddValue"
        />
      </div>
      <div
        :class="[
          outcomeIsSelected ? 'text-white' : 'dark:text-white text-gray-950',
        ]"
        class="text-[1rem] font-black"
      >
        {{ outcome.oddValue }}
      </div>
    </div>
  </button>
</template>

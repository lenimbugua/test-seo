<script setup>
import ArrowDownSolid from "./ArrowDownSolid.vue";
import ArrowRightSolid from "./ArrowRightSolid.vue";
import { storeToRefs } from "pinia";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  competitionId: {
    type: Number,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },

  competitionName: {
    type: String,
    required: true,
  },
  matchCount: {
    type: Number,
    required: true,
  },
  store: {
    type: Function,
    required: true,
  },
});
const {
  fetchCompetitionMatches,
  //  toggleOutcomes
} = props.store();
const { competitions } = storeToRefs(props.store());

// function hasMatches() {
//   const competition = competitions.value[props.index];
//   if (!competition) {
//     return false;
//   }

//   const matches = competition?.matches;

//   if (!matches) {
//     return false;
//   }

//   return matches.length > 0;
// }
function fetchMatches() {
  //   if (hasMatches()) {
  //     toggleOutcomes(props.index);
  //     return;
  //   }
  fetchCompetitionMatches(props.competitionId, props.index);
}

function isOpened() {
  const competition = competitions.value[props.index];
  if (!competition) {
    return false;
  }

  if (competition["isOpened"]) {
    return competition.isOpened;
  }

  const matches = competition?.matches;

  if (!matches) {
    return false;
  }

  return matches.length > 0;
}
</script>

<template>
  <div
    :class="[
      'bg-gray-200 dark:bg-[#393444]',
      'text-dark-purple-23 dark:text-dark-purple-1',
    ]"
    class="flex cursor-pointer justify-between items-center px-1.5 sm:px-3 py-1 sm:py-2 text-sm font-bold"
    @click="fetchMatches()"
  >
    <div>
      {{ competitionName }}
      <span v-if="matchCount">({{ matchCount }})</span>
    </div>
    <ArrowDownSolid v-if="isOpened()" class="fill-current h-6 w-6 sm:w-8" />
    <ArrowRightSolid v-else class="fill-current h-6 w-6" />
  </div>
</template>

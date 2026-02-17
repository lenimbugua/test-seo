<script setup>
import AnimatePulse from "./AnimatePulse.vue";
import { useSortTypes } from "../composables/useSortTypes";
import TheMatch from "./TheMatch.vue";
import { useStoreSwitch } from "../composables/useStoreSwitch";
import { useMatchesStore } from "../stores/matches";
import DarkBorderDivider from "./DarkBorderDivider.vue";
import LiveMatch from "./LiveMatch.vue";
import { storeToRefs } from "pinia";
const { switchStore } = useStoreSwitch();

const { sortByTime } = useSortTypes();

const props = defineProps({
  store: { type: String, default: "matches" },
});

const currentStore = switchStore(props.store);

const { competitions, pending, competitionIsPending, competition } =
  storeToRefs(currentStore());

const { hours, sortBy } = storeToRefs(useMatchesStore());

function isOpened(index) {
  const competition = competitions.value[index];
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

function competitionIsLoading(competitionId) {
  return competitionIsPending.value && competition.value === competitionId;
}
</script>
<template>
  <AnimatePulse v-if="pending" :rows="10" />
  <div v-else>
    <div v-if="sortBy === sortByTime">
      <div v-for="hour in hours" :key="hour.hour">
        <div v-if="hour?.competitions?.length > 0">
          <div
            :class="[
              'bg-gray-300',
              'dark:bg-[#2F293E]',
              'text-dark-purple-23 dark:text-dark-purple-3',
            ]"
            class="flex justify-between items-center px-1.5 sm:px-3 py-1 text-sm font-bold"
          >
            {{ hour.time }} ({{ hour.matchCount }})
            <ArrowDownSolid
              v-if="isOpened"
              class="fill-current h-6 w-6 sm:w-8"
            />
            <ArrowRightSolid v-else class="fill-current h-6 w-6" />
          </div>
          <div
            v-for="(competition, index) in hour.competitions"
            :key="competition.cbinomen"
          >
            <EventCategory
              :index
              :competition-name="competition.competitionName"
              :country-name="competition.countryName"
              :competition-id="competition.competitionId"
              :is-opened="true"
              :store="currentStore"
            />
            <TheMatch :matches="competition.matches" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="competitions">
        <div
          v-for="(competition, index) in competitions"
          :key="competition.cbinomen"
        >
          <EventCategory
            :index
            :competition-name="competition.competitionName"
            :country-name="competition.countryName"
            :competition-id="competition.competitionId"
            :is-opened="true"
            :match-count="competition.matchCount"
            :store="currentStore"
          />
          <DarkBorderDivider v-if="!isOpened(index)" />

          <AnimatePulse
            v-if="competitionIsLoading(competition.competitionId)"
            :rows="1"
          />
          <LiveMatch v-if="isOpened(index)" :matches="competition.matches" />
        </div>
      </div>
    </div>
  </div>
</template>

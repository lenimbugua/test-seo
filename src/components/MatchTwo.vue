<script setup>
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import { useMatchDetails } from "../composables/useMatchDetails";
import { useMatches2Store } from "../stores/matches2";
import { useSportsStore } from "../stores/sports";
import BetNowButton from "./BetNowButton.vue";
import SportsIcons from "./SportsIcons.vue";
import TwoUpIcon from "./TwoUpIcon.vue";

const { goToMatchDetails } = useMatchDetails();
const { humanFriendlyDate } = useFormatDates();
const { scrollId } = storeToRefs(useSportsQueryParamsStore());
const { selectedSport } = storeToRefs(useSportsStore());
const { getDefaultMarket } = storeToRefs(useMatches2Store());

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

const router = useRouter();
defineProps({
  match: {
    type: Object,
    required: true,
  },
});

function outcomeIsLocked(status) {
  return status === -1;
}

function filterBySubTypeId(data) {
  if (!data.length) {
    return [];
  }
  let item = data.find(
    (item) => item.subTypeId === "" + getDefaultMarket.value
  );
  if (!item) {
    return [];
  }
  return item;
}
</script>
<template>
  <div
    :id="match.parentMatchId"
    :class="[
      `match${match.parentMatchId}`,
      { 'animate-highlight-fade': match.parentMatchId === scrollId },
    ]"
    class="leading-none w-full border-b border-gray-200 dark:border-[#09070d]"
  >
    <div class="w-full mx-auto px-2 py-2">
      <div class="w-full flex items-center pb-2 justify-between cursor-pointer">
        <div
          class="w-1/2 flex items-center gap-0.5 leading-none font-semibold text-xs text-gray-600 dark:text-slate-300 text-ellipsis whitespace-nowrap overflow-hidden"
        >
          <SportsIcons :size="'h-4 w-4'" :icon="selectedSport" />
          <div class="text-ellipsis whitespace-nowrap overflow-hidden">
            {{ match.competitionName }}
          </div>
        </div>
        <div
          :class="[
            'text-gray-600 w-1/2 flex items-center gap-0.5 pr-1 dark:text-slate-400 text-xs text-ellipsis whitespace-nowrap overflow-hidden',
            match?.markets[0]?.twoGoalUpActive
              ? 'justify-between'
              : 'justify-end',
          ]"
        >
          <TwoUpIcon v-if="match?.markets[0]?.twoGoalUpActive" />
          <div>{{ humanFriendlyDate(match.startTime) }}</div>
        </div>
      </div>
      <div class="flex justify-between items-center space-x-2 w-full">
        <div
          class="flex-col w-1/3 h-full cursor-pointer justify-between"
          @click="goToMatchDetails(match, router, false)"
        >
          <div
            class="flex-col items-center space-y-1 text-gray-950 dark:text-white md:text-md text-[0.8rem] font-medium leading-none"
          >
            <div
              class="leading-none text-ellipsis whitespace-nowrap overflow-hidden"
            >
              {{ match.homeTeam }}
            </div>
            <div
              class="leading-none text-ellipsis whitespace-nowrap overflow-hidden"
            >
              {{ match.awayTeam }}
            </div>
          </div>
          <div
            :class="['text-dark-purple-17 dark:text-dark-purple-6']"
            class="flex space-x-2 font-bold text-[0.6rem]"
          ></div>
        </div>
        <div class="flex justify-end items-center space-x-4">
          <div class="w-full flex space-x-1 text-xs justify-end items-center">
            <BetNowButton
              v-if="!filterBySubTypeId(match?.markets)?.matchOutcomes?.length"
              @click="goToMatchDetails(match, router, false)"
            />
            <BetNowButton
              v-if="outcomeIsLocked(match?.markets[0]?.status)"
              @click="goToMatchDetails(match, router, false)"
            />
            <TheButton
              v-for="outcome in filterBySubTypeId(match?.markets).matchOutcomes"
              v-else
              :key="outcome.id"
              :outcome="outcome"
              :season-id="match.homeTeam"
              :home-team="match.homeTeam"
              :sport-id="match.sportId"
              :two-goal-up-active="match?.markets[0]?.twoGoalUpActive"
              :custom-id="
                formCustomId(
                  match.parentMatchId,
                  outcome.marketId,
                  outcome.outcomeName,
                  outcome.outcomeId
                )
              "
              :away-team="match.awayTeam"
              :start-time="match.startTime"
              :competition-id="match.competitionId"
              :sub-type-id="parseInt(outcome.marketId)"
              :competition-name="match.competitionName"
              :country-name="match.countryName"
              :sport-name="match.sportName"
              :parent-match-id="match.parentMatchId"
            />
            <div
              class="cursor-pointer px-1 dark:text-slate-300 flex whitespace-nowrap"
              @click="goToMatchDetails(match, router, false)"
            >
              +{{ match.marketCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

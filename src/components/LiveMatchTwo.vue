<script setup>
import { useFormatScores } from "../composables/useFormatScores";

import { useMatchDetails } from "@/composables/useMatchDetails";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMatches2Store } from "../stores/matches2";
import BetNowButton from "./BetNowButton.vue";
import TwoUpIcon from "./TwoUpIcon.vue";

const { goToMatchDetails } = useMatchDetails();

const { getDefaultMarket } = storeToRefs(useMatches2Store());

const { resource } = storeToRefs(useSportsQueryParamsStore());

const { homeScore, awayScore } = useFormatScores();

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

function isLive() {
  return resource.value === "live";
}

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
  <div class="leading-none py-2 w-full">
    <div class="text-xs text-gray-600 dark:text-slate-400 px-1.5">
      <div
        class="w-full flex justify-between items-center cursor-pointer"
        @click="goToMatchDetails(match, router, isLive())"
      >
        <div
          class="w-1/2 flex items-center space-x-1 leading-none font-semibold text-xs text-gray-600 dark:text-slate-400"
        >
          <SportsIcons :size="'h-4 w-4'" :icon="match.sportName" />
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
          <div>
            <span class="text-[#DC2027]">{{ match.statusDesc }}</span
            ><span>. {{ match.periodicTime }}'</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-between px-1.5 space-x-2 w-full border-b border-gray-200 dark:border-[#09070d]"
    >
      <div
        class="w-1/3 h-full cursor-pointer items-center justify-between space-y-2"
        @click="goToMatchDetails(match, router, isLive())"
      >
        <div
          class="w-full space-y-1.5 flex-col items-center text-gray-950 dark:text-white md:text-md text-[0.8rem] font-semimedium leading-none"
        >
          <div class="w-full inline-flex">
            <span class="text-ellipsis whitespace-nowrap overflow-hidden">{{
              match.homeTeam
            }}</span>
          </div>
          <div class="w-full inline-flex">
            <span class="text-ellipsis whitespace-nowrap overflow-hidden">{{
              match.awayTeam
            }}</span>
          </div>
        </div>
        <div
          :class="['text-dark-purple-17 dark:text-dark-purple-6']"
          class="flex space-x-2 font-bold text-[0.6rem]"
        >
          <!-- <div>ID:{{ match.competitionId }}</div> -->
        </div>
      </div>
      <div
        class="w-2/3 flex justify-end items-center py-1.5 sm:py-2.5 space-x-4"
      >
        <div class="w-full flex space-x-1 text-xs justify-end items-center">
          <div class="w-full flex space-x-1 text-xs justify-end items-center">
            <div class="block">
              <div
                class="mb-1.5 font-black text-black dark:text-slate-300 text-md"
              >
                {{ homeScore(match.result) }}
              </div>
              <div class="font-black text-black dark:text-slate-300 text-md">
                {{ awayScore(match.result) }}
              </div>
            </div>
            <div
              v-if="!filterBySubTypeId(match?.markets)?.matchOutcomes?.length"
              class="flex justify-end items-center"
            >
              <BetNowButton v-if="outcomeIsLocked(match?.markets[0]?.status)" />
              <BetNowButton
                @click="goToMatchDetails(match, router, isLive())"
              />
            </div>

            <TheButton
              v-for="outcome in filterBySubTypeId(match?.markets).matchOutcomes"
              v-else
              :key="outcome.id"
              :outcome="outcome"
              :season-id="match.homeTeam"
              :home-team="match.homeTeam"
              :sport-id="match.sportId"
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
              :parent-match-id="match.parentMatchId"
              :competition-name="match.competitionName"
              :country-name="match.countryName"
              :two-goal-up-active="match?.markets[0]?.twoGoalUpActive"
              :sport-name="match.sportName"
            />
          </div>
          <div
            class="cursor-pointer dark:text-slate-300 flex whitespace-nowrap"
            @click="goToMatchDetails(match, router, isLive())"
          >
            +{{ match.marketCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useCompetionsStore } from "@/stores/competitions";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import { useMatches2Store } from "../stores/matches2";
import EmptyState from "./EmptyState.vue";
const { goToMatchDetails } = useMatchDetails();
const router = useRouter();
const { scrollId } = toRefs(useSportsQueryParamsStore());
const { getDefaultMarket } = toRefs(useMatches2Store());

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

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
const { humanFriendlyDate } = useFormatDates();
const { competitions, pending } = toRefs(useCompetionsStore());

function outcomeIsLocked(status) {
  return status === -1;
}
</script>
<template>
  <AnimatePulse v-if="pending" :rows="10" />
  <EmptyState v-else-if="!competitions?.length" />

  <div
    v-for="competition in competitions"
    v-else
    :key="competition.competitionId"
    class="dark:bg-[#1B1627] bg-white border dark:border-0 shadow-sm rounded-lg overflow-hidden cursor-pointer"
  >
    <div
      class="px-3 py-2 bg-gray-200 dark:bg-[#2E283E] flex justify-between items-center"
    >
      <div class="flex items-center">
        <span class="text-xs text-gray-500 dark:text-gray-300">{{
          competition.competitionName
        }}</span>
      </div>
      <div class="flex gap-5 text-gray-500 dark:text-gray-300">
        <div
          class="cursor-pointer"
          @click="competition.isOpened = !competition.isOpened"
        >
          <ChevronUpIcon v-if="!competition.isOpened" class="h-5 w-5" />
          <ChevronDownIcon v-else class="h-5 w-5" />
        </div>
      </div>
    </div>
    <div
      v-if="!competition.isOpened"
      class="border-t dark:border-[#2E283E] border-gray-300"
    >
      <div
        v-for="match in competition.matches"
        :key="match.parentMatchId"
        :class="[
          `match${match.parentMatchId}`,
          { 'animate-highlight-fade': match.parentMatchId === scrollId },
        ]"
        class="p-3 border-b dark:border-[#2E283E]"
      >
        <div class="flex justify-between items-center mb-1">
          <div
            class="flex items-center"
            @click="goToMatchDetails(match, router, false)"
          >
            <span class="text-xs text-gray-500 dark:text-slate-500">{{
              humanFriendlyDate(match.startTime)
            }}</span>
          </div>
          <div
            class="flex items-center text-gray-600 dark:text-gray-400 text-xs italic cursor-pointer"
            @click="goToMatchDetails(match, router, false)"
          >
            <span class="text-xs text-gray-500 dark:text-slate-400 mr-2"
              >+{{ match.marketCount }}</span
            >
            <i class="el-icon"
              ><svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                ></path></svg
            ></i>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div
            class="space-y-1 flex flex-col flex-1 min-w-0 text-gray-600 dark:text-slate-400"
            @click="goToMatchDetails(match, router, false)"
          >
            <div class="text-sm text-left truncate">{{ match.homeTeam }}</div>
            <div class="text-sm text-left truncate">
              {{ match.awayTeam }}
            </div>
          </div>
          <div class="flex justify-end space-x-1">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFormatScores } from "@/composables/useFormatScores";
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useLiveMatchesStore } from "@/stores/live-matches";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { onBeforeUnmount, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import AnimatePulse from "../components/AnimatePulse.vue";
import { useMatches2Store } from "../stores/matches2";

const { goToMatchDetails } = useMatchDetails();

const { setResource } = useSportsQueryParamsStore();
const { pollLiveMatches, getLiveMatches } = useLiveMatchesStore();
const { matches } = toRefs(useLiveMatchesStore());

const pollFrequency = parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  ? parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  : 10000;

let intervalId = null;

onMounted(() => {
  getLiveMatches();
  intervalId = setInterval(() => {
    pollLiveMatches();
  }, pollFrequency);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

onBeforeUnmount(() => {
  setResource("");
});

const { getDefaultMarket } = toRefs(useMatches2Store());

const { resource } = toRefs(useSportsQueryParamsStore());

const { homeScore, awayScore } = useFormatScores();

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

const router = useRouter();

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
  <AnimatePulse v-if="pending" :rows="3" />
  <div v-else class="w-full flex items-center overflow-scroll">
    <div class="flex w-full overflow-scroll scrollbar-hide gap-2">
      <div v-for="match in matches" :key="match.parentMatchId" class="w-full">
        <div
          class="w-[20.6rem] block bg-gray-100 dark:bg-[#241E31] md:dark:bg-[#1B1627] text-white rounded-lg p-3 hover:bg-gray-750 transition cursor-pointer"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <span
                class="relative p-1 rounded-full bg-red-500/50 flex justify-center items-center"
              >
                <span
                  class="animate-ping absolute inline-flex h-[0.3rem] w-[0.3rem] rounded-full bg-green-500"
                ></span>
              </span>
              <span class="text-xs text-red-500 font-medium mr-2 ml-0.5"
                >LIVE</span
              ><span class="text-sm font-semibold text-green-500"
                >{{ match.periodicTime }}"</span
              >
            </div>
            <span
              class="text-xs text-gray-600 dark:text-slate-400 max-w-3/4 text-ellipsis whitespace-nowrap overflow-hidden"
              >{{ match.competitionName }}</span
            >
          </div>
          <div
            class="flex items-center pb-3"
            @click="goToMatchDetails(match, router, isLive())"
          >
            <div class="flex-1 text-black dark:text-slate-300 w-2/3">
              <div class="flex items-center mb-2">
                <span
                  class="text-sm text-ellipsis whitespace-nowrap overflow-hidden"
                  >{{ match.homeTeam }}</span
                >
              </div>
              <div class="flex items-center">
                <span
                  class="text-sm text-ellipsis whitespace-nowrap overflow-hidden"
                  >{{ match.awayTeam }}</span
                >
              </div>
            </div>
            <div class="flex flex-col items-center justify-center ml-4 w-1/3">
              <div class="text-xl font-bold text-black dark:text-slate-300">
                {{ homeScore(match.result) }} - {{ awayScore(match.result) }}
              </div>
              <span class="text-xs text-gray-600 dark:text-slate-400">{{
                match.statusDesc
              }}</span>
            </div>
          </div>
          <div
            v-if="!filterBySubTypeId(match?.markets)?.matchOutcomes?.length"
            class="w-full flex justify-end items-center"
          >
            <BetNowButton
              v-if="outcomeIsLocked(match?.markets[0]?.status)"
              class="w-full"
            />
            <BetNowButton
              class="w-full"
              @click="goToMatchDetails(match, router, isLive())"
            />
          </div>
          <div v-else class="flex gap-2">
            <TheButton
              v-for="outcome in filterBySubTypeId(match?.markets).matchOutcomes"
              :key="outcome.id"
              class="w-full"
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
        </div>
      </div>
    </div>
  </div>
</template>

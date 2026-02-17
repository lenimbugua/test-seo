<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useMatches2Store } from "@/stores/matches2";
import { computed, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useFormatScores } from "../composables/useFormatScores";
import { useScrollToViewedMatch } from "../composables/useScrollToViewedMatch";
import { useSportsIcons } from "../composables/useSportsIcons";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useLiveSportsNavigationStore } from "../stores/live-sports-navigation";
import { useNewLiveStore } from "../stores/new-live";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import LiveSortByMenu from "./live/LiveSortByMenu.vue";
import LiveSportsTabs from "./LiveSportsTabs.vue";

const router = useRouter();
const { scrollId } = toRefs(useSportsQueryParamsStore());
const { sports } = toRefs(useLiveMatchesStore());

const { goToMatchDetails } = useMatchDetails();

const { getSportsIcon } = useSportsIcons();

const { homeScore, awayScore } = useFormatScores();
const { setSelectedSportId } = useLiveSportsNavigationStore();
const { selectedSportId } = toRefs(useLiveSportsNavigationStore());

// const { getDefaultMarket } = toRefs(useMatches2Store());

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};
const { competitions, pending } = toRefs(useNewLiveStore());
const { getLiveMatches, resetAllFilters } = useNewLiveStore();

function outcomeIsLocked(status) {
  return status === -1;
}

onMounted(async () => {
  const matchesStore = useMatches2Store();
  if (!matchesStore.restoreScroll) {
    resetAllFilters();
    console.log("getLiveMatches");
    getLiveMatches();
    setSelectedSportId("");
    return;
  }
  console.log(scrollId.value);
  const { scrollToViewedMatch } = useScrollToViewedMatch();
  await scrollToViewedMatch();
});

function getSportNameByCompetitionId(response, competitionId) {
  const competitions = response || [];

  const competition = competitions.find(
    (c) => c.competitionId === competitionId
  );

  if (
    !competition ||
    !competition.matches ||
    competition.matches.length === 0
  ) {
    return null;
  }

  return competition.matches[0].sportName || null;
}

function getMarketGridCols(match) {
  const length = match?.markets?.[0]?.matchOutcomes?.length;

  // if undefined, null, false, or 0
  if (!length) {
    return 3;
  }

  return length;
}

const goToDetail = (match) => {
  goToMatchDetails(match, router, true);
};

const getSportById = computed(() => {
  return (sportId) => {
    if (!Array.isArray(sports.value)) return null;

    return (
      sports.value.find((sport) => String(sport.sportId) === String(sportId)) ||
      null
    );
  };
});
</script>

<template>
  <main
    class="bg-white dark:bg-[#241E34] flex-1 px-2 sm:px-3 lg:px-6 space-y-1 sm:space-y-4 lg:space-y-6 overflow-x-hidden"
  >
    <div
      class="relative overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-r from-red-700/80 dark:from-red-700/60 via-amber-700 dark:via-green-900/60 to-green-500 border dark:border-white/10 p-2 lg:p-6"
    >
      <div class="absolute top-3 right-3 lg:top-4 lg:right-4">
        <div
          class="flex items-center gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-red-500/30 text-red-500"
        >
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span
          ><span class="text-xs lg:text-sm font-semibold text-red-500"
            >LIVE</span
          >
        </div>
      </div>
      <div class="flex items-center gap-3 lg:gap-4">
        <div
          class="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-destructive to-primary flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-radio w-6 h-6 lg:w-8 lg:h-8 text-white"
          >
            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
            <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
            <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-xl lg:text-2xl font-bold text-white mb-0.5 lg:mb-1">
            Live Betting
          </h1>
          <p class="text-xs lg:text-sm text-slate-200 dark:text-gray-400">
            Boosted odds & cashback rewards
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4 lg:gap-6 mt-2 lg:mt-6">
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-clock w-3 h-3 lg:w-4 lg:h-4 text-amber-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline></svg
          ><span class="text-xs lg:text-sm text-slate-400"
            >Instant payments</span
          >
        </div>
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-activity w-3 h-3 lg:w-4 lg:h-4 text-green-500"
          >
            <path
              d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
            ></path></svg
          ><span class="text-xs lg:text-sm text-slate-400">Real-time odds updates</span>
        </div>
      </div>
    </div>
    <LiveSportsTabs />
    <div class="flex justify-between">
      <div class="flex items-center gap-2 lg:gap-3">
        <span class="text-md lg:text-lg">{{
          getSportsIcon(getSportById(selectedSportId)?.sportBinomen)
        }}</span>
        <h2
          class="text-md lg:text-lg font-bold text-gray-800 dark:text-white capitalize"
        >
          {{ getSportById(selectedSportId)?.sportName }}
        </h2>
        <span
          class="px-2 py-0.5 rounded-full bg-red-800/20 text-red-500 text-xs font-semibold"
          >{{ getSportById(selectedSportId)?.matchCount }} live</span
        >
      </div>
      <div class="flex justify-end">
        <LiveSortByMenu />
      </div>
    </div>

    <div
      v-if="pending"
      class="border shadow-xl border-white/10 rounded-md overflow-clip"
    >
      <AnimatePulse :rows="9" />
    </div>

    <div v-else-if="competitions">
      <div
        v-for="competition in competitions"
        :key="competition.id"
        class="border-0 mb-4"
      >
        <div
          class="border dark:border-white/20 bg-white dark:bg-[#221C31] shadow rounded-lg overflow-clip z-0"
        >
          <div
            class="hover:no-underline border-b dark:border-white/10 bg-gray-100 dark:bg-[#1B1627] px-2"
            @click="competition.isOpened = !competition.isOpened"
          >
            <div
              class="flex items-center justify-between w-full text-left font-medium no-underline p-0"
            >
              <div class="flex items-center justify-between w-full">
                <div class="whitespace-nowrap scrollbar-hide overflow-x-auto">
                  <div class="flex items-center justify-start gap-2">
                    <span class="text-xs">
                      {{
                        getSportsIcon(
                          getSportNameByCompetitionId(
                            competitions,
                            competition.competitionId
                          )
                        )
                      }}
                    </span>
                    <div>
                      <div
                        class="flex items-center text-gray-800 dark:text-white text-xs font-bold"
                      >
                        <div class="leading-none">
                          {{ competition.countryName }}
                        </div>
                        <span class="mx-1">•</span>
                        <div class="leading-none">
                          {{ competition.competitionName }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between space-x-3 ml-2">
                  <div
                    class="inline-flex items-center border bg-white dark:bg-white/5 border-gray-300 dark:border-white/5 px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white rounded-full text-xs font-medium shadow"
                  >
                    {{ competition.matchCount }}
                  </div>
                  <h3
                    data-orientation="vertical"
                    data-state="open"
                    class="flex"
                  >
                    <button
                      type="button"
                      aria-controls=""
                      aria-expanded="true"
                      data-radix-vue-collection-item=""
                      data-orientation="vertical"
                      class="flex flex-1 items-center justify-between py-2.5 text-sm font-medium transition-all hover:underline"
                    >
                      <svg
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        :class="{
                          'rotate-180': competition.isOpened,
                        }"
                        class="h-4 w-4 shrink-0 text-gray-700 dark:text-slate-300 fill-current transition-transform duration-200"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!competition.isOpened" class="pt-0">
            <div
              v-for="match in competition.matches"
              :key="match.parentMatchId"
              :class="[
                `match${match.parentMatchId}`,
                { 'animate-highlight-fade': match.parentMatchId === scrollId },
              ]"
              class="px-2 pt-3 border-b dark:border-white/5 last:border-b-0"
            >
              <div>
                <div
                  class="relative grid items-center mb-2 lg:mb-3 gap-1 grid-cols-2"
                >
                  <div
                    class="flex justify-start items-center space-x-[8px] lg:space-x-2"
                    @click="goToDetail(match)"
                  >
                    <div
                      class="inline-flex items-center rounded-md border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-700 text-white text-xs font-medium text-center shadow hover:bg-red-700"
                    >
                      <span
                        class="flex w-2 h-2 mr-1 bg-white rounded-full animate-pulse"
                      ></span>
                      Live
                    </div>
                    <div class="text-gray-500 dark:text-gray-40 text-xs">
                      {{ match.statusDesc }}
                    </div>
                    <div class="text-red-500 dark:text-gray-40 text-xs">
                      {{ match.periodicTime }}
                    </div>
                  </div>
                  <div class="flex flex-col" @click="goToDetail(match)">
                    <div class="flex justify-end items-center space-x-4">
                      <TwoUpIcon v-if="match?.markets[0]?.twoGoalUpActive" />
                      <span
                        class="text-green-600 dark:text-green-500 text-xs font-medium flex items-center gap-1"
                        >+{{ match.marketCount }} Markets<svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-chevron-down w-3 h-3 -rotate-90"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path></svg
                      ></span>

                      <!-- <span
                        class="whitespace-nowrap text-center text-slate-500 text-xs font-medium"
                        >1 • X • 2</span
                      > -->
                    </div>
                  </div>
                </div>
                <div class="relative grid grid-cols-2 items-center mb-3">
                  <div
                    class="flex justify-start items-center"
                    @click="goToDetail(match)"
                  >
                    <div class="space-y-0 lg:space-y-1.5 mr-1.5">
                      <div
                        class="font-medium text-green-600 dark:text-green-500"
                      >
                        {{ homeScore(match.result) }}
                      </div>
                      <div
                        class="font-medium text-green-600 dark:text-green-500"
                      >
                        {{ awayScore(match.result) }}
                      </div>
                    </div>
                    <div
                      class="space-y-0 text-gray-800 dark:text-slate-200 cursor-pointer lg:space-y-1.5 block relative whitespace-nowrap no-scrollbar overflow-x-auto"
                    >
                      <div class="text-sm font-medium truncate">
                        {{ match.homeTeam }}
                      </div>
                      <div class="text-sm font-medium truncate">
                        {{ match.awayTeam }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex justify-between lg:justify-between items-center gap-x-2 lg:gap-x-3"
                  >
                    <!-- <div class="space-y-1 lg:space-y-2 leading-[0]">
                      <div class="flex gap-1">
                        <div
                          class="w-auto h-3.5 min-w-[10px] bg-red-600 rounded-[2px] flex-col justify-center items-center gap-2.5 inline-flex !bg-transparent"
                        >
                          <div
                            class="self-stretch text-center text-slate-50 text-[8px] font-medium leading-tight !text-transparent"
                          >
                            0
                          </div>
                        </div>
                        <div
                          class="w-auto h-3.5 min-w-[10px] bg-yellow-400 rounded-[2px] flex-col justify-center items-center gap-2.5 inline-flex"
                        >
                          <div
                            class="self-stretch text-center text-slate-50 dark:text-black text-[8px] font-medium leading-tight"
                          >
                            3
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-1">
                        <div
                          class="w-auto h-3.5 min-w-[10px] bg-red-600 rounded-[2px] flex-col justify-center items-center gap-2.5 inline-flex"
                        >
                          <div
                            class="self-stretch text-center text-slate-50 text-[8px] font-medium leading-tight"
                          >
                            1
                          </div>
                        </div>
                        <div
                          class="w-auto h-3.5 min-w-[10px] bg-yellow-400 rounded-[2px] flex-col justify-center items-center gap-2.5 inline-flex"
                        >
                          <div
                            class="self-stretch text-center text-slate-50 dark:text-black text-[8px] font-medium leading-tight"
                          >
                            5
                          </div>
                        </div>
                      </div>
                    </div> -->
                    <!---->
                    <div
                      v-if="!match?.markets[0].matchOutcomes?.length"
                      class="flex justify-end items-center w-full"
                      @click="goToDetail(match)"
                    >
                      <NewBetNowButton />
                    </div>
                    <NewBetNowButton
                      v-if="outcomeIsLocked(match?.markets[0]?.status)"
                    />
                    <div
                      v-else
                      :class="`grid-cols-${getMarketGridCols(match)}`"
                      class="grid text-center items-center gap-2 lg:gap-3 w-full"
                    >
                      <TheButton2
                        v-for="outcome in match?.markets[0].matchOutcomes"
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
                      <!-- <button
                        class="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 bg-slate-100 dark:bg-[#393444] hover:dark:text-slate-100 h-[auto] rounded-md font-medium shadow w-full min-w-full relative"
                      >
                        <span>7.75</span>
                      </button> -->
                      <!-- <button
                        class="cursor-pointer bg-gray-300/70 dark:bg-[#393444] flex justify-center items-center p-2 min-w-14 shadow-md rounded-md"
                      >
                        <div class="flex-col justify-center items-center">
                          <div
                            class="dark:text-slate-400 text-gray-950 text-xs"
                          >
                            2
                            <div
                              data-v-660376ad=""
                              class="arrow down red"
                            ></div>
                          </div>
                          <div
                            class="dark:text-white text-gray-950 text-[0.7rem] font-bold"
                          >
                            300.60
                          </div>
                        </div>
                      </button> -->
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-orientation="horizontal"
                role="separator"
                class="bg-border h-px w-full shrink my-4 lg:hidden hidden"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

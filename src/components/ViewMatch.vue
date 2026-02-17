<script setup>
// import { useSeoTags } from "@/composables/useSeoTags";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { useHead } from "@unhead/vue";
import { computed, ref, toRefs } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useGeniusGameTracker } from "../composables/useGeniusGameTracker";
import { useIconNames } from "../composables/useIconNames";
import { useMatchesStore } from "../stores/matches";
import BetBuilder from "./BetBuilder.vue";
// import GeniusGameTracker from "./GeniusGameTracker.vue";
import { useCompetionsStore } from "@/stores/competitions";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import EmptyState from "./EmptyState.vue";
import AppIcons from "./icons/AppIcons.vue";
import MatchDetails from "./MatchDetails.vue";
import MatchDetailsMatch from "./MatchDetailsMatch.vue";

const route = useRoute();

const matchId = route.params.id;

const { setMatchId } = useSportsQueryParamsStore();
const { selectCompetitions } = useCompetionsStore();
const { isGeniusGameTrackerSport } = useGeniusGameTracker(matchId);

const { betBuilderIcon, solarDocumentTextBroken, statsIcon } = useIconNames();

const prematchTabs = ref([
  {
    name: "Markets",
    alias: "Markets",
    icon: solarDocumentTextBroken,
    isHot: false,
  },
  {
    name: "BetBuilder",
    alias: "Jenga Bets",
    icon: betBuilderIcon,
    isHot: true,
  },
  {
    name: "stats",
    alias: "stats",
    icon: statsIcon,
    isHot: false,
  },
]);

const liveTabs = ref([
  {
    name: "Markets",
    alias: "Markets",
    icon: solarDocumentTextBroken,
    isHot: false,
  },
  {
    name: "stats",
    alias: "stats",
    icon: statsIcon,
    isHot: false,
  },
]);

const { matchDetails, matchDetailIsLive, pending } = toRefs(useMatchesStore());

const { pollMatchDetails, fetchMatchDetails } = useMatchesStore();

// Reactively update SportsEvent JSON-LD startDate once API resolves
useHead({
  script: [
    {
      type: "application/ld+json",
      key: "match-details-schema",
      children: computed(() => {
        const m = matchDetails.value;
        if (!m) return "{}";
        const baseUrl = "https://hakibets.com";
        const slug = m.homeTeam && m.awayTeam
          ? `${m.homeTeam} vs ${m.awayTeam}`
          : "Sports Match";
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name: slug,
          url: `${baseUrl}${route.path}`,
          eventStatus: m.isLiveCoverage
            ? "https://schema.org/EventInProgress"
            : "https://schema.org/EventScheduled",
          startDate: m.startTime ?? new Date().toISOString(),
          competitor: [
            { "@type": "SportsTeam", name: m.homeTeam ?? "Home Team" },
            { "@type": "SportsTeam", name: m.awayTeam ?? "Away Team" },
          ],
          organizer: {
            "@type": "Organization",
            name: "Hakibets",
            url: baseUrl,
          },
        });
      }),
    },
  ],
});

function performInitialFetch() {
  if (matchDetailIsLive.value) {
    pollMatchDetails(matchId);
    return;
  }
  console.log(matchId);
  fetchMatchDetails(matchId);
}

performInitialFetch();

const pollFrequency = parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  ? parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  : 10000;

let intervalId = null;

intervalId = setInterval(() => {
  if (matchDetails?.value?.isLiveCoverage) {
    pollMatchDetails(matchId);
  }
}, pollFrequency);

onBeforeRouteLeave(() => {
  setMatchId("");
  clearInterval(intervalId);
  selectCompetitions([]);
});
</script>
<template>
  <AnimatePulse v-if="pending" :rows="10" />
  <div v-else>
    <div
      class="w-full mt-2 md:mt-0 rounded-t-lg overflow-clip shadow-2xl border-x dark:border-white/5"
    >
      <div class="w-full">
        <div
          style="z-index: 60"
          class="w-full top-0 md:top-[5.05rem] rounded-t-lg overflow-clip border-t dark:border-white/5"
        >
          <div
            class="bg-gray-300 dark:bg-[#1B1627] py-2 w-full flex justify-between text-gray-700 dark:text-slate-200 font-bold"
          >
            <ChevronLeftIcon
              
              class="cursor-pointer h-7 w-7"
              @click="$router.go(-1)"
            />
            <span>Match Details</span>
            <div></div>
          </div>
        </div>
        <div v-if="matchDetails">
          <MatchDetailsMatch :match-details />
          <TabGroup>
            <TabList
              style="z-index: 60"
              class="flex w-full sticky top-0 md:top-[4.9rem] p-1 gap-2 border dark:border-white/5 bg-gray-300 dark:bg-[#1B1627]"
            >
              <Tab
                v-for="tab in matchDetails.isLiveCoverage
                  ? liveTabs
                  : prematchTabs"
                :key="tab.name"
                v-slot="{ selected }"
                as="template"
              >
                <div
                  :class="[
                    'cursor-pointer w-full relative  rounded-md flex gap-1 tracking-wide p-1.5 px-2  justify-center items-center',
                    'focus:outline-none',
                    selected
                      ? 'text-green-700 bg-green-500/20 font-bold'
                      : ' text-gray-600 dark:text-gray-200/80',
                  ]"
                >
                  <div
                    v-if="tab.isHot"
                    class="flex gap-0.5 absolute right-0 top-0 py-0.5 px-1 rounded-md border-red-600 bg-amber-900 text-[0.45rem] leading-none text-white"
                  >
                    <div class="text-[0.6rem] px-[0.1rem]">🔥</div>
                    <span
                      class="bg-rose-600 rounded-full px-1.5 py-[0.1rem] text-[0.5rem] font-bold text-white"
                      >NEW</span
                    >
                  </div>
                  <!-- <div
                        v-if="tab.isHot"
                        class="flex absolute right-1 -top-2 items-center gap-0.5 skew-x-12 bg-amber-900 px-0.5"
                      >
                        <div class="text-[0.6rem]">🔥</div>
                        <span
                          class="bg-rose-600 rounded-full px-1.5 text-[0.5rem] font-bold text-white"
                          >NEW</span
                        >
                      </div> -->
                  <AppIcons :icon-name="tab.icon" icon-css="h-5 w-5" />
                  <div class="capitalize text-xs">{{ tab.alias }}</div>
                </div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MatchDetails />
              </TabPanel>
              <TabPanel v-if="!matchDetails.isLiveCoverage">
                <BetBuilder />
              </TabPanel>
              <TabPanel>
                <GeniusGameTracker v-if="isGeniusGameTrackerSport()" />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        <EmptyState v-else />
      </div>
    </div>
  </div>
</template>

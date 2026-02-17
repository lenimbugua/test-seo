<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { ref, toRefs } from "vue";
import { useBetBuilderStore } from "../stores/betbuilder";
import { useMatchesStore } from "../stores/matches";
import BetBuilderButton from "./BetBuilderButton.vue";
import BetBuilderSlip from "./BetBuilderSlip.vue";
// import EarlyPayoutBadge from "./EarlyPayoutBadge.vue";
// import EarlyWinIcon from "./EarlyWinIcon.vue";
// import TwoUpIcon from "./TwoUpIcon.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { toggleMarketOutcomes, fetchMatchDetailsSubtype } = useMatchesStore();

const {
  matchDetails,
  // pending,
  subtypePending,
  subTypeId,
} = toRefs(useMatchesStore());

const { markDisabledWithFallbackMatching, fetchBetBuilderMatches } =
  useBetBuilderStore();
const { data, getSelectionByParentMatchId } = toRefs(useBetBuilderStore());

// const tabs = ref(["Create My Own", "Trending"]);
const tabs = ref([]);

// const formCustomId = (marketId, outcomeId) => {
//   return `${marketId}${outcomeId}`;
// };

// fetchMatchDetails();

// const tabs = ref(["Main", "All", "Goals", "1st Half", "2nd Half", "Corners"]);

function hasMatches(matchDetail) {
  const outcomes = matchDetail?.matchOutcomes;
  if (!outcomes) {
    return false;
  }
  return outcomes.length > 0;
}
function fetchMatches(market, index) {
  if (hasMatches(market)) {
    toggleMarketOutcomes(index);
    return;
  }

  //   setSubTypeId(market.subTypeId);
  fetchMatchDetailsSubtype(market.subTypeId, index);
}

function isOpened(index) {
  const matchDetail = data?.value?.markets[index];
  if (!matchDetail) {
    return false;
  }

  if (matchDetail["isOpened"]) {
    return matchDetail.isOpened;
  }
  return hasMatches(matchDetail);
}

function subtypeIsLoading(subType) {
  return subtypePending.value && subTypeId.value === subType;
}

const selectedGroup = ref(0);

function filterByGroupId(dataArray, groupId) {
  if (selectedGroup.value == 0) {
    return dataArray;
  }
  return dataArray.filter((item) => item.groupId === groupId);
}

function setButtonSelected() {
  if (getSelectionByParentMatchId?.value(route.params.id)?.length > 0) {
    fetchBetBuilderMatches();
    return;
  }

  markDisabledWithFallbackMatching(matchDetails.value, null);
}

setButtonSelected();
</script>
<template>
  <div
    class="bg-gray-100 dark:bg-[#2F293E] border-b dark:border-dark-purple-16"
  >
    <TabGroup>
      <!-- 🔹 Sticky Tab Bar -->
      <TabList
        class="flex w-full sticky top-0 z-50 p-1 gap-2 border-b dark:border-white/5 dark:bg-[#241E34] bg-white"
      >
        <Tab
          v-for="(tab, index) in tabs"
          :key="index"
          v-slot="{ selected }"
          as="template"
        >
          <div
            :class="[
              'cursor-pointer py-1.5 px-4 text-xs whitespace-nowrap text-center font-medium',
              'focus:outline-none transition-colors',
              selected
                ? 'border-b-2 border-[#35c31f] dark:text-[#35c31f] text-green-800 font-semibold'
                : 'dark:text-gray-100/90 text-gray-800 hover:text-[#35c31f]/70',
            ]"
          >
            {{ tab }}
          </div>
        </Tab>
      </TabList>

      <!-- 🔹 Scrollable Tab Panels -->
      <div class="overflow-y-auto scrollbar-hide max-h-[calc(100vh-4rem)]">
        <TabPanels>
          <!-- 🔸 First Tab: Create My Own -->
          <TabPanel class="w-full">
            <!-- Sticky Slip -->
            <div
              class="sticky top-0 z-40 bg-gray-100 dark:bg-[#241E34] border-b border-gray-200 dark:border-white/5"
            >
              <BetBuilderSlip :parent-match-id="data.parentMatchId" />
            </div>

            <!-- Market list -->
            <div class="px-1.5 py-2">
              <div
                v-for="(market, index) in filterByGroupId(
                  data.markets,
                  selectedGroup
                )"
                :key="market.name"
                class="text-dark-purple-20 dark:text-dark-purple-5 text-xs border-b border-gray-200 dark:border-white/10 py-2"
              >
                <div
                  class="flex items-center justify-between cursor-pointer"
                  @click="fetchMatches(market, index)"
                >
                  <div class="flex w-full justify-between gap-2 items-center">
                    <div>{{ market.oddType }}</div>
                  </div>

                  <ChevronUpIcon
                    v-if="isOpened(index)"
                    class="dark:text-dark-purple-5 h-4 w-4 text-dark-purple-23"
                  />
                  <ChevronDownIcon
                    v-else
                    class="dark:text-dark-purple-5 h-4 w-4 text-dark-purple-23"
                  />
                </div>

                <AnimatePulse
                  v-if="subtypeIsLoading(market.subTypeId)"
                  :rows="1"
                />

                <div
                  v-if="isOpened(index) && market.matchOutcomes?.length"
                  class="grid gap-1 w-full mt-1"
                  :class="[
                    market.matchOutcomes.length % 3 === 0
                      ? 'grid-cols-3'
                      : 'grid-cols-2',
                  ]"
                >
                  <BetBuilderButton
                    v-for="outcome in market.matchOutcomes"
                    :key="outcome.outcomeId"
                    :outcome="outcome"
                    :season-id="data.homeTeam"
                    :multi-bet-market-name="market.multiBetMarketName"
                    :home-team="data.homeTeam"
                    :custom-id="outcome.multiBetOutcomeName"
                    :away-team="data.awayTeam"
                    :start-time="data.startTime"
                    :sport-id="data.sportId"
                    :competition-id="data.competitionId"
                    :sub-type-id="parseInt(market.subTypeId)"
                    :parent-match-id="data.parentMatchId"
                    :competition-name="data.competitionName"
                    :country-name="data.countryName"
                    :two-goal-up-active="market?.twoGoalUpActive"
                    :sport-name="data.sportName"
                    :is-match-detail="true"
                  />
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- 🔸 Second Tab: Trending -->
          <!-- <TabPanel class="p-2">
            <div class="flex flex-col mx-auto sm:grid sm:grid-cols-2 gap-4">
              <BetBuilderCompetition v-for="i in 4" :key="i" />
            </div>
          </TabPanel> -->
        </TabPanels>
      </div>
    </TabGroup>
  </div>

  <EmptyState v-if="!data" />
</template>

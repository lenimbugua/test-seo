<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { ref, toRefs } from "vue";
import { useMatchesStore } from "../stores/matches";
// import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import EarlyPayoutBadge from "./EarlyPayoutBadge.vue";
import EarlyWinIcon from "./EarlyWinIcon.vue";
import TheButton from "./TheButton.vue";
import TwoUpIcon from "./TwoUpIcon.vue";

const { toggleMarketOutcomes, fetchMatchDetailsSubtype } = useMatchesStore();

// const { setScrollPosition } = useSportsQueryParamsStore();

const {
  matchDetails,
  marketGroups,
  subtypePending,
  subTypeId,
} = toRefs(useMatchesStore());

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

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

  fetchMatchDetailsSubtype(market.subTypeId, index);
}

function isOpened(index) {
  const matchDetail = matchDetails?.value?.markets[index];
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

function setSelectedgroup(groupId) {
  selectedGroup.value = groupId;
}

function filterByGroupId(dataArray, groupId) {
  if (selectedGroup.value == 0) {
    return dataArray;
  }
  return dataArray.filter((item) => item.groupId === groupId);
}

// setScrollPosition(matchDetails.value.parentMatchId);
</script>
<template>
  <!-- <AnimatePulse v-if="pending" :rows="10" /> -->
  <div>
    <!-- Match Details Tabs -->
    <div
      class="sticky top-[2.7rem] md:top-[7rem] bg-gray-100 dark:bg-[#2F293E]"
    >
      <TabGroup>
        <TabList
          class="flex justify-between border-b dark:border-dark-purple-16 w-full scrollbar-hide overflow-x-scroll"
        >
          <Tab v-slot="{ selected }" as="template" @click="setSelectedgroup(0)">
            <div
              :class="[
                'cursor-pointer pb-1 pt-4  px-4 text-xs whitespace-nowrap text-center font-medium',
                ' focus:outline-none',
                selected
                  ? 'border-b-2 border-[#35c31f] text-[#35c31f] font-semibold'
                  : 'dark:text-gray-100/90 text-gray-800',
              ]"
            >
              All
            </div>
          </Tab>
          <Tab
            v-for="tab in marketGroups"
            :key="tab.groupId"
            v-slot="{ selected }"
            as="template"
            @click="setSelectedgroup(tab.groupId)"
          >
            <div
              :class="[
                'cursor-pointer pb-1 pt-4  px-4 text-xs whitespace-nowrap text-center font-medium',
                ' focus:outline-none',
                selected
                  ? 'border-b-2 border-[#35c31f] text-green-800 dark:text-[#35c31f]  font-semibold'
                  : 'dark:text-gray-100/90 text-gray-800',
              ]"
            >
              {{ tab.groupName }}
            </div>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
    <!--End of Match Details Tabs -->
    <div class="px-1.5 py-2">
      <div
        v-for="(market, index) in filterByGroupId(
          matchDetails.markets,
          selectedGroup
        )"
        :key="market.name"
        class="text-dark-purple-20 dark:text-dark-purple-5 text-xs p-1.5 border-b dark:border-white/5 py-2"
      >
        <div
          class="flex items-center pb-1 justify-between cursor-pointer"
          @click="fetchMatches(market, index)"
        >
          <div class="flex w-full justify-between gap-2 items-center">
            <div>{{ market.oddType }}</div>
            <div
              v-if="market?.twoGoalUpActive"
              class="flex items-center space-x-0.5"
            >
              <EarlyWinIcon />
              <EarlyPayoutBadge />
              <TwoUpIcon />
            </div>
          </div>

          <ChevronUpIcon
            v-if="isOpened(index)"
            class="dark:text-dark-purple-5 h-4 w-4 text-dark-purple-23 stroke-4"
          />
          <ChevronDownIcon
            v-else
            class="dark:text-dark-purple-5 h-4 w-4 text-dark-purple-23"
          />
        </div>
        <AnimatePulse v-if="subtypeIsLoading(market.subTypeId)" :rows="1" />
        <div
          v-if="isOpened(index)"
          class="grid gap-1 w-full"
          :class="[
            market.matchOutcomes.length % 3 === 0
              ? 'grid-cols-3'
              : 'grid-cols-2',
          ]"
        >
          <TheButton
            v-for="outcome in market.matchOutcomes"
            :key="
              formCustomId(
                matchDetails.parentMatchId,
                market.subTypeId,
                outcome.outcomeName,
                outcome.outcomeId
              )
            "
            class=""
            :outcome="outcome"
            :season-id="matchDetails.homeTeam"
            :home-team="matchDetails.homeTeam"
            :custom-id="
              formCustomId(
                matchDetails.parentMatchId,
                market.subTypeId,
                outcome.outcomeName,
                outcome.outcomeId
              )
            "
            :away-team="matchDetails.awayTeam"
            :start-time="matchDetails.startTime"
            :sport-id="matchDetails.sportId"
            :competition-id="matchDetails.competitionId"
            :sub-type-id="parseInt(market.subTypeId)"
            :parent-match-id="matchDetails.parentMatchId"
            :competition-name="matchDetails.competitionName"
            :country-name="matchDetails.countryName"
            :two-goal-up-active="market?.twoGoalUpActive"
            :sport-name="matchDetails.sportName"
            :is-match-detail="true"
          />
        </div>
      </div>
    </div>
  </div>
  <EmptyState v-if="!matchDetails" />
</template>

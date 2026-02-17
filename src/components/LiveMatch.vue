<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useFormatScores } from "../composables/useFormatScores";
import BetNowButton from "./BetNowButton.vue";

const { goToMatchDetails } = useMatchDetails();

const { resource } = storeToRefs(useSportsQueryParamsStore());

const { homeScore, awayScore } = useFormatScores();

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

const router = useRouter();
defineProps({
  matches: {
    type: Array,
    required: true,
  },
});

function isLive() {
  return resource.value === "live";
}

function outcomeIsLocked(status) {
  return status === -1;
}
</script>
<template>
  <div
    v-for="match in matches"
    :key="match.id"
    class="leading-none space-y-2 w-full"
  >
    <div
      class="flex items-center justify-between px-1.5 space-x-2 w-full border-b border-gray-200 dark:border-[#09070d]"
    >
      <div
        class="flex-col w-1/2 md:w-1/3 h-full cursor-pointer justify-between space-y-2"
        @click="goToMatchDetails(match, router, isLive())"
      >
        <div
          class="flex-col space-y-0.5 text-gray-950 dark:text-white md:text-md text-[0.8rem] font-semimedium leading-none"
        >
          <div class="leading-none">{{ match.homeTeam }}</div>
          <div class="leading-none">{{ match.awayTeam }}</div>
        </div>
        <div
          :class="['text-dark-purple-17 dark:text-dark-purple-6']"
          class="flex space-x-2 font-bold text-[0.6rem]"
        >
          <div class="font-black uppercase">
            <span class="text-[#DC2027]">{{ match.statusDesc }}</span
            >. {{ match.periodicTime }}'
          </div>
          <!-- <div>ID:{{ match.competitionId }}</div> -->
          <div>+{{ match.marketCount }} more</div>
        </div>
      </div>
      <div
        class="w-1/2 md:w-2/3 flex justify-end items-center py-1.5 sm:py-2.5 space-x-4"
      >
        <div
          :class="['text-dark-purple-17 dark:text-dark-purple-6']"
          class="flex flex-col font-black space-y-1 text-md"
        >
          <span>{{ homeScore(match.result) }}</span>
          <span>{{ awayScore(match.result) }}</span>
        </div>
        <div
          class="w-full md:w-1/3 flex space-x-1 text-xs justify-end items-center"
        >
          <BetNowButton v-if="outcomeIsLocked(match?.markets[0]?.status)" />
          <TheButton
            v-for="outcome in match?.markets[0]?.matchOutcomes"
            v-else
            :key="outcome.id"
            :outcome="outcome"
            :season-id="match.homeTeam"
            :home-team="match.homeTeam"
            :sport-id="match.sportId"
            :custom-id="
              formCustomId(
                match.parentMatchId,
                match.markets[0].subTypeId,
                outcome.outcomeName,
                outcome.outcomeId
              )
            "
            :away-team="match.awayTeam"
            :start-time="match.startTime"
            :competition-id="match.competitionId"
            :sub-type-id="match.markets[0]?.subTypeId"
            :parent-match-id="match.parentMatchId"
          />
        </div>
        <div
          class="w-1/3 hidden md:flex space-x-1 text-xs justify-end items-center"
        >
          <BetNowButton v-if="outcomeIsLocked(match?.markets[1]?.status)" />
          <TheButton
            v-for="outcome in match?.markets[1]?.matchOutcomes"
            v-else
            :key="outcome.id"
            :outcome="outcome"
            :season-id="match.homeTeam"
            :home-team="match.homeTeam"
            :sport-id="match.sportId"
            :custom-id="
              formCustomId(
                match.parentMatchId,
                match.markets[1].subTypeId,
                outcome.outcomeName,
                outcome.outcomeId
              )
            "
            :away-team="match.awayTeam"
            :start-time="match.startTime"
            :competition-id="match.competitionId"
            :sub-type-id="match.markets[1]?.subTypeId"
            :parent-match-id="match.parentMatchId"
          />
        </div>
        <div
          class="w-1/3 hidden xl:flex space-x-1 text-xs justify-end items-center"
        >
          <BetNowButton v-if="outcomeIsLocked(match?.markets[2]?.status)" />
          <TheButton
            v-for="outcome in match?.markets[2]?.matchOutcomes"
            v-else
            :key="outcome.id"
            :outcome="outcome"
            :season-id="match.homeTeam"
            :home-team="match.homeTeam"
            :sport-id="match.sportId"
            :custom-id="
              formCustomId(
                match.parentMatchId,
                match.markets[2].subTypeId,
                outcome.outcomeName,
                outcome.outcomeId
              )
            "
            :away-team="match.awayTeam"
            :start-time="match.startTime"
            :competition-id="match.competitionId"
            :sub-type-id="match.markets[2]?.subTypeId"
            :parent-match-id="match.parentMatchId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

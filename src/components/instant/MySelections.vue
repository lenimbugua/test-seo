<script setup>
import homeLogo from "@/assets/img/mancity.png";
import awayLogo from "@/assets/img/manu.png";
import InstantScoreTimes from "./InstantScoreTimes.vue";
import InstantSelections from "./InstantSelections.vue";
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";

const { selections } = storeToRefs(useInstantStore());
</script>
<template>
  <div class="px-4">
    <div
      class="w-full flex justify-center text-gray-600 dark:text-white/60 font-bold py-2"
    >
      My Selections
    </div>
    <div
      v-for="match in selections"
      :key="match.match_id"
      class="border-b pt-2 dark:border-dark-purple-18"
    >
      <div class="flex w-full justify-between">
        <div class="flex w-2/5 justify-between">
          <div>
            <img class="w-6 h-6" :src="homeLogo" :alt="match.home_team" />
          </div>
          <div class="flex text-gray-700 dark:text-gray-400">
            <div>{{ match.home_team }}</div>
          </div>
        </div>
        <div class="w-1/5 flex justify-center space-x-2">
          <InstantScore :is-home="true" :score="match.livescore[0]" />
          <InstantScore :is-home="false" :score="match.livescore[0]" />
        </div>
        <div class="flex w-2/5 justify-between">
          <div class="flex text-gray-700 dark:text-gray-400">
            {{ match.away_team }}
          </div>
          <div>
            <img class="w-6 h-6" :src="awayLogo" :alt="match.away_team" />
          </div>
        </div>
      </div>
      <div
        class="w-full flex space-x-5 justify-center items-center pt-1.5 text-gray-600 dark:text-gray-400"
      >
        <div class="w-1/2 flex justify-end">
          <InstantScoreTimes
            :score-times="match.livescore[0].home_score_time"
          />
        </div>
        <div class="w-1/2">
          <InstantScoreTimes
            :score-times="match.livescore[0].away_score_time"
          />
        </div>
      </div>
      <HalfTimeScore :half-time-score="match.livescore[0].halftime_score" />
      <InstantSelections :selection="match.selections[0]" />
    </div>
  </div>
</template>

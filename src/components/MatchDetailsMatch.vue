<script setup>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { toRefs } from "vue";
import { useFormatDates } from "../composables/useFormatDates";
import { useMatchesStore } from "../stores/matches";
import formatStuff from "../utilities/format-stuff";

const { matchDetailIsLive } = toRefs(useMatchesStore());

const { fetchMatchByDirection } = useMatchesStore();

// import ChevronLeftOutline from "./ChevronLeftOutline.vue";
defineProps({
  matchDetails: {
    type: Object,
    required: true,
  },
});
const { formCloudflareImage } = formatStuff();
const { humanFriendlyDate } = useFormatDates();
const homeCloudflareImageId = "838abd24-152a-4dfc-588b-429d6c4cd900";
const awayCloudflareImageId = "41bed17d-b0da-4f9d-912f-537ec8d4fc00";
</script>
<template>
  <div class="py-4 space-y-3">
    <CountryCompetitionTitle
      :country="matchDetails.countryName"
      :competition="matchDetails.competitionName"
      :sport-id="matchDetails.sportId"
    />
    <div class="flex px-2 text-xs justify-center items-center">
      <div
        v-if="!matchDetailIsLive"
        class="flex items-center cursor-pointer"
        @click="fetchMatchByDirection(matchDetails.parentMatchId, 'previous')"
      >
        <ChevronLeftIcon class="h-6 w-6 cursor-pointer text-slate-400" />
        <span class="text-gray-600 dark:text-slate-400">prev</span>
      </div>
      <div class="flex px-3 text-xs justify-center gap-4 items-center">
        <div
          class="flex flex-col items-center text-gray-600 dark:text-slate-400 space-y-2"
        >
          <img
            class="h-12 w-12 object-cover"
            :src="formCloudflareImage(homeCloudflareImageId)"
          />
          <div class="text-center">{{ matchDetails.homeTeam }}</div>
        </div>
        <div
          class="text-center font-extrabold tracking-widest text-3xl text-gray-700 dark:text-slate-300"
        >
          <div v-if="matchDetails.result">{{ matchDetails.result }}</div>
          <div v-else class="text-slate-400">:</div>
        </div>
        <div
          class="flex flex-col items-center text-gray-600 dark:text-slate-400 space-y-2"
        >
          <img
            class="h-12 w-12 object-cover"
            :src="formCloudflareImage(awayCloudflareImageId)"
          />
          <div class="text-center">{{ matchDetails.awayTeam }}</div>
        </div>
      </div>
      <div
        v-if="!matchDetailIsLive"
        class="flex items-center cursor-pointer"
        @click="fetchMatchByDirection(matchDetails.parentMatchId, 'next')"
      >
        <span class="text-gray-600 dark:text-slate-400">Next</span>
        <ChevronRightIcon class="h-6 w-6 text-slate-400" />
      </div>
    </div>

    <div class="flex px-3 text-xs justify-center items-center">
      <div v-if="matchDetails.isLiveCoverage" class="font-black uppercase">
        <div class="flex dark:text-slate-400">
          <div class="text-[#DC2027]">
            {{ matchDetails.status }}
          </div>
          . {{ matchDetails.periodicTime }}'
        </div>
      </div>
      <div v-else class="dark:text-dark-purple-4 text-dark-purple-15">
        Starts {{ humanFriendlyDate(matchDetails.startTime) }}
      </div>
    </div>
  </div>
</template>

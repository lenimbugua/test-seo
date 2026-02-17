<script setup>
import { useFormatDates } from "@/composables/useFormatDates";
import { useCompetionsStore } from "@/stores/competitions";
import { useModalStore } from "@/stores/modal";
import { toRefs } from "vue";
import { useMatchesStore } from "../stores/matches";
const { closeModal } = useModalStore();
const { fetchMatchDetails } = useMatchesStore();

const { competitions, pending } = toRefs(useCompetionsStore());
const { humanFriendlyDate } = useFormatDates();

function goFetchMatchDetails(matchId) {
  closeModal();
  fetchMatchDetails(matchId);
}
</script>
<template>
  <div
    v-if="pending"
    class="shadow bg-pattern p-2 w-full bg-gray-100 dark:bg-dark-purple-22"
  >
    <div
      v-for="i in 8"
      :key="i"
      class="animate-pulse flex w-full justify-between mb-2 gap-2"
    >
      <div
        class="h-12 w-1/2 bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 rounded"
      ></div>
      <div
        class="h-12 w-1/2 bg-gray-400 dark:bg-dark-purple-5/30 border-gray-400 dark:border-dark-purple-500/20 rounded"
      ></div>
    </div>
  </div>

  <div v-else>
    <div
      v-if="competitions && competitions[0]?.matches"
      class="grid grid-cols-2 gap-3 min-h-[10rem] bg-gray-300 dark:bg-[#1B1627] p-3 rounded-md"
    >
      <div
        v-for="match in competitions[0]?.matches"
        :key="match.parentMatchId"
        class="bg-gray-50 dark:bg-[#2E283E] cursor-pointer border border-white/10 shadow-2xl leading-none rounded-md p-1"
        @click="goFetchMatchDetails(match.parentMatchId)"
      >
        <div class="text-xs text-gray-500 dark:text-slate-400">
          {{ humanFriendlyDate(match.startTime) }}
        </div>
        <div class="text-sm text-gray-600 dark:text-slate-300/90">
          {{ match.homeTeam }}
        </div>
        <div class="text-sm text-gray-600 dark:text-slate-300/90">
          {{ match.awayTeam }}
        </div>
      </div>
    </div>
    <div v-else class="flex w-full h-52 justify-center items-center">
      <div>
        <div class="noData"></div>
        <div class="w-full text-center text-gray-950 dark:text-slate-50">
          No data
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { useDark } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { useAffiliateV2Store } from "../../stores/affiliate-v2";
import SparkleLoader from "./SparkleLoader.vue";

const isDark = useDark();

const { fetchLeaderboard } = useAffiliateV2Store();
const { leaderBoard, earnings, pending } = toRefs(useAffiliateV2Store());
const date = ref(new Date());
fetchLeaderboard(date.value);

const { fetchEarnings } = useAffiliateV2Store();

fetchEarnings(date.value);

const itsMyRank = (rank) => {
  console.log(rank);
  console.log(earnings.value);
  return rank == earnings?.value?.rank;
};
</script>
<template>
  <VueDatePicker
    v-model="date"
    :dark="isDark"
    @update:model-value="fetchLeaderboard(date)"
  />
  <div
    class="bg-gray-200 dark:bg-[#2A2438] border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden mt-2 mb-16"
  >
    <div
      class="px-6 py-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center bg-gray-200 dark:bg-[#1F1A2D]"
    >
      <h3 class="font-bold text-gray-700 dark:text-white">Leaderboard</h3>
      <span class="text-xs text-amber-600 dark:text-[#FFB002] animate-pulse"
        >● Live Updates</span
      >
    </div>
    <SparkleLoader v-if="pending" />
    <div v-else>
      <div v-if="!leaderBoard || !leaderBoard.length" class="p-12 text-center">
        <div
          class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-2xl">📱</span>
        </div>
        <p class="text-gray-300 font-semibold mb-2">No data yet</p>
        <p class="text-gray-500 text-sm">
          Once data is available, you will see it here!
        </p>
      </div>
      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-400">
            <thead
              class="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-[#241E34]"
            >
              <tr>
                <th scope="col" class="px-1 py-3">Rank</th>
                <th scope="col" class="px-6 py-3">Player</th>
                <th scope="col" class="px-6 py-3">% Completed</th>
                <th scope="col" class="px-6 py-3 text-right">Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="player in leaderBoard"
                :key="player.msisdn"
                :class="
                  itsMyRank(player.position)
                    ? 'bg-green-600/20 dark:bg-green-600/20 text-green-700'
                    : 'bg-white dark:bg-[#2A2438] text-gray-600 dark:text-white'
                "
                class="border-b border-gray-300 dark:border-gray-700 hover-bg-gray-100 dark:hover:bg-[#241E34] transition-colors"
              >
                <td class="py-4 font-mono text-center">
                  {{ player.position }}
                </td>
                <td class="px-6 py-4 font-mono">
                  {{ itsMyRank(player.position) ? "You" : player.msisdn }}
                </td>
                <td class="px-6 py-4 font-mono">
                  {{ player.percentage }}
                </td>
                <td class="px-6 py-4 font-mono">
                  {{ player.prize }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 bg-gray-100 dark:bg-[#1F1A2D] text-center">
          <button
            class="text-xs text-gray-600 dark:text-gray-400 hover:text-white transition-colors"
          >
            View All History
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

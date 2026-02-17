<script setup>
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { useDark } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { useAffiliateV2Store } from "../../stores/affiliate-v2";

const isDark = useDark();

const date = ref(new Date());

const { fetchLeaderboard } = useAffiliateV2Store();
const { prizes } = toRefs(useAffiliateV2Store());
fetchLeaderboard(date.value);
</script>
<template>
  <VueDatePicker
    v-model="date"
    :dark="isDark"
    @update:model-value="fetchLeaderboard(date)"
  />
  <div
    class="bg-[#2A2438] border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden mt-2"
  >
    <div
      class="px-6 py-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center bg-gray-200 dark:bg-[#1F1A2D]"
    >
      <h3 class="font-bold text-gray-700 dark:text-white">Prizes</h3>
      <span class="text-xs text-amber-600 dark:text-[#FFB002] animate-pulse"
        >● Live Updates</span
      >
    </div>
    <SparkleLoader v-if="pending" />
    <div v-else>
      <div v-if="!prizes || !prizes.length" class="p-12 text-center">
        <div
          class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-2xl">📱</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 font-semibold mb-2">
          No data yet
        </p>
        <p class="text-gray-500 text-sm">
          Once data is available, you will see it here!
        </p>
      </div>
      <div v-else>
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-600 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-[#241E34]"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Position</th>
                <th scope="col" class="px-6 py-3">Prize</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="prize in prizes"
                :key="prize.msisdn"
                class="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2A2438] hover-bg-gray-100 dark:hover:bg-[#241E34] transition-colors"
              >
                <td class="px-6 py-4 font-mono text-gray-600 dark:text-white">
                  {{ prize.position }}
                </td>
                <td class="px-6 py-4 font-mono text-gray-600 dark:text-white">
                  {{ prize.prize }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 bg-gray-200 dark:bg-[#1F1A2D] text-center">
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

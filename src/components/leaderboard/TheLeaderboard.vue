<script setup>
import { useLeaderboardStore } from "@/stores/leaderboard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { ref, toRefs } from "vue";
import EligibleCasinoGame from "./EligibleCasinoGame.vue";

const { isSelected, categories } = toRefs(useLeaderboardStore());

const casinoTabs = ref(["Leaderboard", "Eligible Games"]);

const selectedCasinoTab = ref(casinoTabs.value[0]);

const isSelectedCasinoTab = (tab) => selectedCasinoTab.value === tab;
const setSelectedCasinoTab = (tab) => (selectedCasinoTab.value = tab);

</script>
<template>
  <div
    class="mt-4 sm:mt-0 bg-white dark:bg-dark-purple-19 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-dark-purple-17"
  >
    <div
      v-if="isSelected(categories[0])"
      class="flex justify-between items-center px-2 py-2 sm:py-3 border-b border-gray-200 dark:border-dark-purple-17"
    >
      <h2 class="text-md sm:text-2xl font-bold text-gray-900 dark:text-white">
        Current Standings
      </h2>
      <span
        v-if="isSelected(categories[0])"
        class="text-md text-gray-600 dark:text-gray-400"
        >sports ⚽</span
      >
      <div v-else class="flex items-center justify-center">
        <span class="text-xs text-gray-600 dark:text-gray-400">Casino</span>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-red-600"
        >
          <path
            d="M12 2
         C8 6 4 9 4 13
         a4 4 0 0 0 7 2
         v3
         h2
         v-3
         a4 4 0 0 0 7 -2
         C20 9 16 6 12 2z"
          />
        </svg>
      </div>
    </div>

    <TabGroup v-if="isSelected(categories[1])">
      <div
        class="flex items-center justify-between dark:bg-dark-purple-18 border-b border-gray-200 dark:border-dark-purple-17 py-1 px-3"
      >
        <TabList class="flex space-x-1 rounded-xl p-1">
          <Tab v-for="tab in casinoTabs" :key="tab" as="template">
            <button
              :class="[
                'rounded-full px-3 py-0.5 sm:py-2 text-sm font-medium leading-5 border dark:border-transparent ',
                'focus:outline-none',
                isSelectedCasinoTab(tab)
                  ? 'bg-green-500 text-dark-purple-23 shadow'
                  : 'text-gray-600 dark:text-slate-300  bg-white/[0.12] hover:bg-white/[0.2]',
              ]"
              @click="setSelectedCasinoTab(tab)"
            >
              {{ tab }}
            </button>
          </Tab>
        </TabList>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-red-600"
        >
          <path
            d="M12 2
                   C8 6 4 9 4 13
                   a4 4 0 0 0 7 2
                   v3
                   h2
                   v-3
                   a4 4 0 0 0 7 -2
                   C20 9 16 6 12 2z"
          />
        </svg>
      </div>
      <TabPanels>
        <TabPanel class="w-full">
          <div class="overflow-x-auto">
            <LeaderboardTable />
          </div>
        </TabPanel>

        <TabPanel class="w-full p-2">
          <EligibleCasinoGame />
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <div v-else class="overflow-x-auto">
      <LeaderboardTable />
    </div>
  </div>
</template>

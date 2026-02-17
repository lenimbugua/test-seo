<script setup>
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useInstantStore } from "@/stores/instant";

const {
  fetchInstantMatches,
  setSelectedCompetition,
  setCompetitionIsLoading,
  resetSelectedMarket,
} = useInstantStore();
const { competitions } = storeToRefs(useInstantStore());

async function fetchMatches(competition) {
  setCompetitionIsLoading(true);
  resetSelectedMarket();
  setSelectedCompetition(competition);
  const url = `&market_id=Match_Result&skip=0`;
  await fetchInstantMatches(url);
  setCompetitionIsLoading(false);
}
</script>
<template>
  <div
    class="w-full max-w-5xl overflow-scroll flex border-t border-[#B1B0B1] dark:border-dark-purple-18 justify-between p-3"
  >
    <TabGroup>
      <TabList
        class="w-full flex space-x-1 rounded-md bg-blue-900/20 dark:bg-[#504B5C] p-1"
      >
        <Tab
          v-for="competition in competitions"
          :key="competition.name"
          v-slot="{ selected }"
          as="template"
          @click="fetchMatches(competition)"
        >
          <button
            :class="[
              'w-full flex rounded-md pt-1 justify-center items-center text-gray-950 dark:text-gray-50 capitalize text-lg whitespace-nowrap',
              ' focus:outline-none',
              selected
                ? 'bg-white dark:bg-[#241E34] text-blue-700 shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            <div class="flex-col justify-center">
              <div class="flex justify-center">
                <img :src="competition.flag" :alt="competition.name + ' flag'" class="w-6 h-6 mr-2" />
              </div>
              <div class="text-sm text-black dark:text-gray-50">
                {{ competition.name }}
              </div>
            </div>
          </button>
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

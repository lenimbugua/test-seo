<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { StarIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useBetsStore } from "../stores/bets";

import { useBetsStatus } from "../composables/useBetsStatus";

const { all, pending, won, cashedOut, lost, voided, cancelled, pendingPayout } =
  useBetsStatus();

const categories = ref([
  {
    name: "Open",
    status: pending,
  },
  {
    name: "All Bets",
    status: all,
  },
  {
    name: "Settled",
    status: won,
  },
  {
    name: "Cashed Out",
    status: cashedOut,
  },
  {
    name: "Pending Payouts",
    status: pendingPayout,
  },
]);

const settledCategories = ref([
  {
    name: "Won",
    status: won,
  },

  {
    name: "Voided",
    status: voided,
  },
  {
    name: "Cancelled",
    status: cancelled,
  },
  {
    name: "Lost",
    status: lost,
  },
]);

const { fetchBets, setAllIsPending, setPending } = useBetsStore();
const { allIsPending } = storeToRefs(useBetsStore());

async function getBets() {
  setAllIsPending(true);
  await fetchBets(1);
  setAllIsPending(false);
}

getBets();

async function filterBetsByStatus(status) {
  setPending(true);
  await fetchBets(status);
  setPending(false);
  //   return bets.value.filter((bet) => bet.status === status);
}
</script>
<template>
  <BetsLoader v-if="allIsPending" />

  <div
    v-else
    class="px-2 pt-4 border dark:border-dark-purple-19 rounded-md shadow"
  >
    <div class="flex items-center space-x-2 dark:text-gray-50">
      <ChevronLeftIcon class="w-7 h-7 cursor-pointer" @click="$router.go(-1)" />
      <div>Back</div>
    </div>

    <div
      class="ml-2 py-2 flex w-full space-x-2 items-center text-lg text-md dark:text-white tracking-wide"
    >
      <StarIcon class="w-6 h-6 text-yellow-500" />
      <h3>My Bets</h3>
    </div>
    <TabGroup>
      <TabList
        class="flex justify-between rounded-md dark:bg-white/5 bg-white border dark:border-dark-purple-19 p-0.5"
      >
        <Tab
          v-for="category in categories"
          :key="category"
          v-slot="{ selected }"
          as="template"
          @click="filterBetsByStatus(category.status)"
        >
          <div
            :class="[
              'cursor-pointer rounded-md py-1.5 px-1 text-xs whitespace-nowrap text-center font-medium',
              ' focus:outline-none',
              selected
                ? 'dark:bg-black/30 bg-black/10 text-[#35c31f] font-semibold'
                : 'dark:text-gray-100/90 text-gray-800',
            ]"
          >
            {{ category.name }}
          </div>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TheBets />
        </TabPanel>

        <TabPanel>
          <TheBets />
        </TabPanel>
        <TabPanel>
          <TabGroup>
            <TabList class="flex w-full border-b dark:border-dark-purple-19">
              <Tab
                v-for="category in settledCategories"
                :key="category"
                v-slot="{ selected }"
                as="template"
                @click="filterBetsByStatus(category.status)"
              >
                <div
                  :class="[
                    'cursor-pointer py-3 w-24  text-sm dark:text-gray-100/90 text-gray-800 text-center font-medium',
                    ' focus:outline-none',
                    selected ? 'border-b-2 border-green-500 font-semibold' : '',
                  ]"
                >
                  {{ category.name }}
                </div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TheBets />
              </TabPanel>
              <TabPanel>
                <TheBets />
              </TabPanel>
              <TabPanel>
                <TheBets />
              </TabPanel>
              <TabPanel>
                <TheBets />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </TabPanel>
        <TabPanel>
          <TheBets />
        </TabPanel>
        <TabPanel>
          <TheBets />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

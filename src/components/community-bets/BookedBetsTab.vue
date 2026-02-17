<script setup>
import BookedBetsFAQs from "@/components/community-bets/BookedBetsFAQs.vue";
import LoadCode from "@/components/community-bets/LoadCode.vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

import { ref } from "vue";

// const categories = ref(["Bets Hub", "Popular", "Favorite", "Load Code", "FAQ"]);
const categories = ref(["Bets Hub", "Load Code", "FAQ"]);
</script>
<template>
  <TabGroup>
    <TabList
      class="flex justify-between rounded-lg dark:bg-white/5 bg-white border dark:border-dark-purple-19 p-0.5"
    >
      <Tab
        v-for="category in categories"
        :key="category"
        v-slot="{ selected }"
        as="template"
      >
        <div
          :class="[
            'cursor-pointer rounded-md py-1.5  px-2 text-xs whitespace-nowrap text-center font-medium',
            ' focus:outline-none',
            selected
              ? 'dark:bg-black/30 bg-black/10 text-[#35c31f] font-semibold'
              : 'dark:text-gray-100/90 text-gray-800',
          ]"
        >
          {{ category }}
        </div>
      </Tab>
    </TabList>
    <TabPanels class="">
      <TabPanel>
        <BookedBetsCategory />
      </TabPanel>
      <!-- <TabPanel>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectionsCard />
          <SelectionsCard />
          <SelectionsCard />
          <SelectionsCard />
        </div>
      </TabPanel>
      <TabPanel>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectionsCard />
          <SelectionsCard />
          <SelectionsCard />
          <SelectionsCard />
        </div>
      </TabPanel> -->
      <TabPanel class="mb-16 md:mb-20">
        <LoadCode />
      </TabPanel>
      <TabPanel>
        <div><BookedBetsFAQs /></div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

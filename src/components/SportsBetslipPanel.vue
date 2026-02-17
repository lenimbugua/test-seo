<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import SportsBetslip from "./SportsBetslip.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="relative w-[21rem]">
    <div
      class="w-full sticky top-24 rounded-t-lg sm:px-0 border dark:border-white/5"
    >
      <TabGroup>
        <TabList
          class="flex p-1 bg-white dark:bg-[#1b1627] rounded-t-lg border-b dark:border-black"
        >
          <Tab v-slot="{ selected }" as="template">
            <div
              data-fly-target="betslip"
              :class="[
                'w-full cursor-pointer rounded-md py-2 text-lg text-center font-extrabold',
                ' focus:outline-none',
                selected
                  ? 'dark:bg-[#504B5C] bg-gray-200 dark:text-gray-200 text-gray-900 shadow'
                  : 'text-gray-400/80 dark:hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Betslip
            </div>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <RouterLink
              :to="{ name: 'my-bets' }"
              :class="[
                'w-full cursor-pointer rounded-md py-2 text-center font-extrabold',
                ' focus:outline-none',
                selected
                  ? 'bg-[#504B5C] dark:text-gray-200 shadow'
                  : 'dark:text-gray-400/80 text-gray-950/50 hover:bg-white/[0.12]',
              ]"
            >
              MyBets
            </RouterLink>
          </Tab>
        </TabList>
        <TabPanels class="">
          <TabPanel>
            <SportsBetslip />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

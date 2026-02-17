<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import ArrowDownSolid from "./ArrowDownSolid.vue";
import ArrowUpSolid from "./ArrowUpSolid.vue";
import SportsUpcoming from "./SportsUpcoming.vue";
import SportsToday from "./SportsToday.vue";
import TodayNav from "./TodayNav.vue";
import CountriesNav from "./CountriesNav.vue";
import PopularNav from "./PopularNav.vue";
</script>
<template>
  <TabGroup>
    <TabList class="w-full flex rounded-full divide-x divide-gray-300 group">
      <div
        :class="[
          'bg-[#16131E] mr-4 space-x-1 cursor-pointer rounded-full font-bold text-[0.5rem] tracking-wide p-1.5 py-2 flex justify-center items-center',
          ' focus:outline-none',
        ]"
      >
        <div class="text-[#9F9EA1]">Markets</div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 text-[#9F9EA1]"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 15l4-4H8zm0 7q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
          ></path>
        </svg>
      </div>
      <Tab v-slot="{ selected }" as="template">
        <div
          :class="[
            'cursor-pointer w-14 rounded-l-full font-bold text-[0.5rem] tracking-wide p-1.5 px-2 border-r border-gray-50 flex justify-center items-center',
            ' focus:outline-none',
            selected
              ? 'bg-[#009260] shadow text-gray-100'
              : 'bg-[#16131E] text-gray-200/80',
          ]"
        >
          Highlights
        </div>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <div
          :class="[
            'w-full cursor-pointer font-bold text-[0.5rem] tracking-wide p-1.5 px-2 border-r border-gray-50  flex justify-center items-center',
            ' focus:outline-none',
            selected
              ? 'bg-[#009260] shadow text-gray-100'
              : 'bg-[#16131E] text-gray-200/80',
          ]"
        >
          upcoming
        </div>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <div
          :class="[
            'w-full cursor-pointer font-bold text-[0.5rem] tracking-wide p-1.5 px-2 border-r flex justify-center items-center',
            'focus:outline-none',
            selected
              ? 'bg-[#009260] shadow text-gray-100'
              : 'bg-[#16131E] text-gray-200/80',
          ]"
        >
          Today
          <ArrowUpSolid v-if="selected" class="h-4 w-4" />
          <ArrowDownSolid v-else class="h-4 w-4" />
        </div>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <div
          :class="[
            'w-full cursor-pointer   font-bold text-[0.5rem]  tracking-wide p-1.5 px-2 border-r border-gray-50  flex justify-center items-center',
            ' focus:outline-none',
            selected
              ? 'bg-[#009260] shadow text-gray-100'
              : 'bg-[#16131E] text-gray-200/80',
          ]"
        >
          Countries
        </div>
      </Tab>
      <Tab v-slot="{ selected }" as="template">
        <div
          :class="[
            'w-full cursor-pointer  rounded-r-full  font-bold text-[0.5rem]  tracking-wide p-1.5 px-2  flex justify-center items-center',
            ' focus:outline-none',
            selected
              ? 'bg-[#009260] shadow text-gray-100'
              : 'bg-[#16131E] text-gray-200/80',
          ]"
        >
          Popular
        </div>
      </Tab>
    </TabList>
    <TabPanels class="">
      <TabPanel>
        <SportsToday />
      </TabPanel>
      <TabPanel>
        <SportsUpcoming />
      </TabPanel>
      <TabPanel>
        <TodayNav />
      </TabPanel>
      <TabPanel>
        <CountriesNav />
      </TabPanel>
      <TabPanel>
        <PopularNav />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import { useSportsStore } from "@/stores/sports";
import CalendarPopover from "./CalendarPopover.vue";
import { useMatchesStore } from "../stores/matches";
import { useFormatDates } from "../composables/useFormatDates";
import HoursTab from "./HoursTab.vue";
import { storeToRefs } from "pinia";

const { selectedSport } = storeToRefs(useSportsStore());

const { generateNextFourDays } = useFormatDates();

const nextFourDays = generateNextFourDays();

const { fetchDayMatches } = useMatchesStore();

function fetchMatchesByDate(date) {
  fetchDayMatches(date);
}
</script>
<template>
  <div
    :class="[
      'bg-gray-300 text-dark-purple-23',
      'dark:bg-[#2F293E] dark:text-dark-purple-1',
    ]"
    class="px-1.5 sm:px-3 flex text-lg font-bold w-full items-center justify-between pl-2 rounded-t-md"
  >
    <div class="capitalize">{{ selectedSport }}</div>
    <TabGroup>
      <TabList
        class="flex items-center space-x-3 sm:space-x-4 justify-between text-xs"
      >
        <Tab v-slot="{ selected }" as="template">
          <div
            :class="[
              'w-full cursor-pointer text-[0.9rem] text-center py-2 sm:py-4 font-bold',
              ' focus:outline-none',
              selected ? ' ' : '',
            ]"
            :style="[selected ? 'border-bottom: 2px solid #35c31f;' : '']"
          >
            <HoursTab />
          </div>
        </Tab>
        <Tab
          v-for="day in nextFourDays"
          :key="day.date"
          v-slot="{ selected }"
          as="template"
          @click="fetchMatchesByDate(day.date)"
        >
          <div
            :class="[
              'w-full cursor-pointer text-[0.9rem] text-center py-2 sm:py-4 font-bold uppercase',
              ' focus:outline-none',
              selected ? '' : '',
            ]"
            :style="[selected ? 'border-bottom: 2px solid #35c31f;' : '']"
          >
            {{ day.day }}
          </div>
        </Tab>

        <Tab v-slot="{ selected }" as="template">
          <div
            :class="[
              'w-full flex  text-[0.9rem] justify-center items-center py-2 sm:py-4 font-bold',
              ' focus:outline-none',
              selected ? '' : '',
            ]"
            :style="[selected ? 'border-bottom: 2px solid #35c31f;' : '']"
          >
            <CalendarPopover />
          </div>
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

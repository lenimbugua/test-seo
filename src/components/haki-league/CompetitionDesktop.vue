<script setup>
import { useCompetitions } from "@/composables/haki-league/useCompetitions.js";
import { Tab, TabGroup, TabList } from "@headlessui/vue";

const {
  competitions,
  formFlagUrl,
  // fetchMatches
} = useCompetitions();
</script>
<template>
  <div class="pl-3">
    <div
      :class="['bg-white dark:bg-[#37304B]']"
      class="rounded-md overflow-hidden border dark:border-white/10"
    >
      <div
        class="flex space-x-1 rounded-t-md bg-gray-300 dark:bg-[#1b1627] text-gray-700 dark:text-slate-300 px-2"
      >
        Competitions
      </div>
      <TabGroup>
        <TabList>
          <Tab
            v-for="competition in competitions"
            :key="competition.name"
            v-slot="{ selected }"
            as="template"
          >
            <div
              class="flex flex-col p-4"
              :class="[
                'w-full cursor-pointer  py-2 text-md text-center font-semibold',
                ' focus:outline-none',
                selected
                  ? 'bg-[#177B29] text-white shadow'
                  : 'dark:text-slate-400 text-gray-950/80',
              ]"
            >
              <div class="relative w-20 h-12">
                <img
                  :src="formFlagUrl(competition.flag)"
                  :alt="competition.name"
                  class="absolute inset-0 h-full w-full object-cover rounded-md"
                />
              </div>
              <div class="text-xs py-0.5">
                {{ competition.name }}
              </div>
            </div>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  </div>
</template>

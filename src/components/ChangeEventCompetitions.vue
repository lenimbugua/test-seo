<script setup>
import { useCompetionsStore } from "@/stores/competitions";
import { useCountriesStore } from "@/stores/countries";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { toRefs } from "vue";

const { setSelectedCompetition } = useCountriesStore();
const { fetchCompetions, selectCompetitions } = useCompetionsStore();

const { selectedCompetitions, selectedCompetition } = toRefs(
  useCountriesStore()
);

function fetchGame(competition) {
  selectCompetitions([competition.competitionId]);
  setSelectedCompetition(competition.competitionName);
  fetchCompetions();
}

const competitionIsSelected = (competitionName) =>
  competitionName === selectedCompetition.value;
</script>
<template>
  <TabGroup>
    <TabList class="flex gap-2 w-full py-3 overflow-scroll scrollbar-hide">
      <Tab
        v-for="competition in selectedCompetitions"
        :key="competition"
        as="template"
        @click="fetchGame(competition)"
      >
        <div
          :class="[
            'cursor-pointer  rounded-full  flex justify-center items-center p-2  text-xs whitespace-nowrap text-center font-medium',
            ' focus:outline-none',
            competitionIsSelected(competition.competitionName)
              ? 'font-semibold bg-green-600 text-green-100'
              : 'dark:text-gray-100/90 text-gray-800 bg-gray-300 dark:bg-[#1B1627]',
          ]"
        >
          <span>{{ competition.competitionName }}</span>
        </div>
      </Tab>
    </TabList>
  </TabGroup>
</template>

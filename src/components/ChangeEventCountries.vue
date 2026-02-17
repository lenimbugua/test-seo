<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";

import { toRefs } from "vue";

// import { useCountry } from "@/composables/useCountry";
import { useCountriesStore } from "@/stores/countries";

const {
  fetchChangeEventCountries,
  //   setSelectedCompetitions,
  //   selectCountry,
  //   setSelectedCompetition,
  getCompetitionsByCountry,
} = useCountriesStore();
const { countries, selectedCountry } = toRefs(useCountriesStore());

// function getCompetitionsByCountry(data, countryName) {
//   const country = data.find(
//     (c) => c.countryName.toLowerCase() === countryName.toLowerCase()
//   );
//   if (!country) {
//     setSelectedCompetitions([]);
//   }
//   selectCountry(country.countryName);
//   setSelectedCompetition(country.competitions[0].competitionName);
//   setSelectedCompetitions(country.competitions);
// }

fetchChangeEventCountries();

const countryIsSelected = (country) =>
  country.countryName === selectedCountry.value;
</script>
<template>
  <TabGroup>
    <TabList
      class="flex justify-between border-b dark:border-dark-purple-16 w-full scrollbar-hide overflow-x-scroll"
    >
      <Tab
        v-for="country in countries"
        :key="country.countryName"
        as="template"
        @click="getCompetitionsByCountry(country.countryName, true)"
      >
        <div
          :class="[
            'cursor-pointer pb-1 pt-4  flex items-center gap-0.5  px-4 text-xs whitespace-nowrap text-center font-medium',
            ' focus:outline-none',
            countryIsSelected(country)
              ? 'border-b-2 border-[#35c31f] text-green-800 dark:text-[#35c31f]  font-semibold'
              : 'dark:text-gray-100/90 text-gray-800',
          ]"
        >
          <img class="h-4 w-4" :src="country.flagUrl" :alt="country.countryName + ' flag'" />
          <div class="text-center">{{ country.countryName }}</div>
        </div>
      </Tab>
    </TabList>
  </TabGroup>
</template>

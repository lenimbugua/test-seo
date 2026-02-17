<script setup>
import { useCompetionsStore } from "@/stores/competitions";
import { useCountriesStore } from "@/stores/countries";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { computed,  onBeforeUnmount, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import TableLoader from "./TableLoader.vue";

import { useScrollToViewedMatch } from "../composables/useScrollToViewedMatch";

const route = useRoute();

const { fetchCountries } = useCountriesStore();
const { countries, pending } = toRefs(useCountriesStore());
const { selectedCompetitions } = toRefs(useCompetionsStore());
const { fetchCompetions, selectCompetitions } = useCompetionsStore();
const { setLayout, setDay } = useSportsQueryParamsStore();

fetchCountries();

const router = useRouter();

const showMatches = computed(() => {
  return Object.keys(route.query).length > 0;
});

// Toggle all competitions for a country
const toggleCountry = (country) => {
  const allIds = country.competitions.map((c) => c.competitionId);
  const allSelected = allIds.every((id) =>
    selectedCompetitions.value.includes(id)
  );

  if (allSelected) {
    // Deselect all
    selectedCompetitions.value = selectedCompetitions.value.filter(
      (id) => !allIds.includes(id)
    );
  } else {
    // Select all (merge unique)
    selectedCompetitions.value = [
      ...new Set([...selectedCompetitions.value, ...allIds]),
    ];
  }
};

// Check if country is fully selected
const isCountryFullySelected = (country) =>
  country.competitions.every((c) =>
    selectedCompetitions.value.includes(c.competitionId)
  );

// Check if country is partially selected
const isCountryPartiallySelected = (country) => {
  const selectedCount = country.competitions.filter((c) =>
    selectedCompetitions.value.includes(c.competitionId)
  ).length;
  return selectedCount > 0 && selectedCount < country.competitions.length;
};

const clear = () => {
  selectedCompetitions.value = [];
};

const fetchCompetitions = () => {
  setLayout("grid");
  setDay("");

  selectCompetitions(selectedCompetitions.value);
  router.replace({
    query: {
      competitionIds: selectedCompetitions.value.join(","),
    },
  });
  showMatches.value = true;
  fetchCompetions();
};

onBeforeUnmount(() => {
  selectCompetitions([]);
  clear();
});

onMounted(async () => {
  const { scrollToViewedMatch } = useScrollToViewedMatch();
  await scrollToViewedMatch();
});


</script>

<template>
  <div v-if="!showMatches">
    <TableLoader v-if="pending" />
    <div v-else class="bg-white dark:bg-[#1B1627]">
      <div class="sticky top-[3rem] md:top-[9rem] bg-white dark:bg-[#1B1627]">
        <div
          class="flex justify-between items-center p-2 md:py-3 rounded-md dark:border-dark-purple-17"
        >
          <div class="font-bold text-black dark:text-white">
            Home /Sports / Soccer / Countries
          </div>
        </div>
        <div
          class="flex p-2 space-x-3 dark:bg-[#241E34] bg-gray-100 border-t dark:border-gray-900 border-gray-300 z-40"
        >
          <button
            class="flex-1 py-1.5 rounded-lg dark:bg-[#393444] bg-gray-200 text-gray-700 dark:text-white !rounded-button cursor-pointer"
            @click="clear"
          >
            Clear</button
          ><button
            :disabled="selectedCompetitions.length === 0"
            class="flex-1 py-1 rounded-lg bg-[#137824] text-white !rounded-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="fetchCompetitions"
          >
            View Matches ({{ selectedCompetitions.length }})
          </button>
        </div>
      </div>
      <div class="p-2">
        <div
          v-for="country in countries"
          :key="country"
          class="w-full mb-2 dark:bg-white/5 rounded-md border dark:border-dark-purple-17"
        >
          <div
            :class="[
              country.isOpened ? 'border-b dark:border-dark-purple-22' : '',
            ]"
            class="w-full flex justify-between items-center p-2 text-black dark:text-white"
          >
            <label
              class="flex items-center space-x-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                :checked="isCountryFullySelected(country)"
                :indeterminate="isCountryPartiallySelected(country)"
                class="w-4 h-4 accent-[#1B1627] checked:accent-green-600 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-amber-500 focus:outline-none rounded"
                @change="toggleCountry(country)"
              />
              <span>{{ country.countryName }}</span>
            </label>
            <!-- <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  :checked="isCountryFullySelected(country)"
                  :indeterminate="isCountryPartiallySelected(country)"
                  class="text-[#1B1627] w-4 h-4 border border-gray-900 rounded bg-[#1B1627] checked:bg-green-600"
                  @change="toggleCountry(country)"
                />
              </label> -->
            <div class="flex space-x-2 items-center">
              <div
                class="text-sm rounded-full border dark:border-dark-purple-17 px-2"
              >
                {{ country.competitionCount }}
              </div>
              <div
                class="cursor-pointer"
                @click="country.isOpened = !country.isOpened"
              >
                <ChevronUpIcon v-if="country.isOpened" class="h-5 w-5" />
                <ChevronDownIcon v-else class="h-5 w-5" />
              </div>
            </div>
          </div>
          <div v-if="country.isOpened" class="py-2">
            <div
              v-for="competition in country.competitions"
              :key="competition"
              class="flex justify-between px-2 pb-2 text-black dark:text-gray-50/80"
            >
              <label
                class="flex items-center space-x-2 text-gray-700 cursor-pointer"
              >
                <input
                  v-model="selectedCompetitions"
                  type="checkbox"
                  :value="competition.competitionId"
                  class="w-4 h-4 accent-[#1B1627] checked:accent-green-600 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-amber-500 focus:outline-none rounded"
                />
                <span class="text-sm text-gray-600 dark:text-slate-400">{{
                  competition.competitionName
                }}</span>
              </label>
              <div
                class="text-sm rounded-full border dark:border-dark-purple-17 p-0.5"
              >
                {{ competition.matchCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-white dark:bg-[#241E34] pb-2">
    <div
      class="sticky z-[2] top-[3rem] md:top-[9rem] bg-white dark:bg-[#241E34]"
    >
      <!-- <div
        class="flex justify-between items-center pt-2 px-2 rounded-md dark:border-dark-purple-17"
      >
        <div class="font-bold text-black dark:text-white">
          Home / Sports / Soccer / Countries / competitions
        </div>
      </div> -->
      <div class="flex justify-between px-2">
        <HighlitsTab /><LeaguesButton />
        <CalendarDropdown />
      </div>
      <!-- <HighlitsTab /> -->
      <div class="flex items-center justify-between py-2 px-2">
        <MarketSection />
        <!-- <CalendarDropdown /> -->
      </div>
    </div>
    <div class="space-y-4 p-2">
      <InfiniteScroll />
      <!-- <LeagueMatchCard /> -->
    </div>
  </div>
</template>

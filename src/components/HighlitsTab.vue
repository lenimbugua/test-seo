<script setup>
import { useCompetionsStore } from "@/stores/competitions";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
// import { Squares2X2Icon } from "@heroicons/vue/24/outline";
import { ref, toRefs } from "vue";

const { fetchCompetions, selectCompetitions } = useCompetionsStore();

const highlights = ref([
  {
    name: "highlight",
  },
  {
    name: "upcoming",
  },
  {
    name: "grid",
  },
]);

const { setResource, setDay, setLayout } = useSportsQueryParamsStore();
const { layout } = toRefs(useSportsQueryParamsStore());
const { markets } = toRefs(useCompetionsStore());

const { getMatches, emptyMatches, setCalendarIsPending, setMarkets } =
  useMatches2Store();

const fetchCompetitions = async () => {
  selectCompetitions([]);
  await fetchCompetions();
  setMarkets(markets.value);
};

async function fetchMatches(resource) {
  setLayout(resource);
  if (resource === "grid") {
    fetchCompetitions();
    return;
  }
  emptyMatches();
  setDay("");
  setResource(resource);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}

function isSelected(selected) {
  if (layout.value) {
    return selected === layout.value;
  }
}
</script>
<template>
  <div class="flex items-center justify-between dark:text-white text-sm">
    <div class="flex items-center">
      <TabGroup>
        <TabList
          class="flex p-0.5 w-full shadow dark:border-dark-purple-16 rounded-md overflow-scroll scrollbar-hide bg-gray-200 dark:bg-white/5"
        >
          <Tab
            v-for="category in highlights"
            :key="category.name"
            as="template"
            @click="fetchMatches(category.name)"
          >
            <button
              :class="[
                'w-full p-1 px-2 sm:px-6 text-xs whitespace-nowrap capitalize  rounded-md',
                ' focus:outline-none',
                isSelected(category.name)
                  ? 'dark:bg-black/30 bg-white font-semibold   text-[#56CB05]'
                  : 'dark:text-white text-gray-950',
              ]"
            >
              <div v-if="category.name === 'grid'">Popular</div>
              <!-- <Squares2X2Icon v-if="category.name === 'grid'" class="w-4 h-4" /> -->
              <!-- <Squares2X2Icon v-if="category.name === 'grid'" class="w-4 h-4" /> -->
              <span v-else>{{ category.name }}</span>
            </button>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  </div>
</template>

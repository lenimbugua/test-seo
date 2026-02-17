<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useMatches2Store } from "../stores/matches2";

const { setSelectedMarket, resetSelectedMarket } = useMatches2Store();
const { markets } = storeToRefs(useMatches2Store());

function fetchMatches(subtype) {
  setSelectedMarket(subtype);
}

onBeforeMount(() => {
  resetSelectedMarket();
});
</script>

<template>
  <TabGroup>
    <TabList
      class="flex p-0.5 w-full shadow dark:border-dark-purple-16 rounded-md overflow-scroll scrollbar-hide bg-gray-200 dark:bg-white/5"
    >
      <Tab
        v-for="category in markets"
        :key="category.name"
        v-slot="{ selected }"
        class="rounded-md dark:border-dark-purple-16"
        as="template"
      >
        <button
          :class="[
            'w-full p-1  text-xs whitespace-nowrap  ',
            ' focus:outline-none',
            selected
              ? 'dark:bg-black/30 bg-white font-semibold  text-[#56CB05]'
              : 'dark:text-white text-gray-950',
          ]"
          @click="fetchMatches(category.subTypeId)"
        >
          {{ category.oddType }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>

<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { ref } from "vue";
import CasinoIcons from "./CasinoIcons.vue";

import { usePopularStore } from "@/stores/popular";

const { getGamesByCategory } = usePopularStore();

const selectedCategory = ref("All Games");

defineProps({
  categories: { type: Array, required: true },
});

function isSelected(id) {
  if (!selectedCategory.value) return false;
  return selectedCategory.value.category_id === id;
}

function selectCategory(category) {
  selectedCategory.value = category;
  getGamesByCategory(category.category_id);
}
</script>
<template>
  <TabGroup v-if="categories" vertical>
    <TabList class="flex flex-col">
      <Tab
        v-for="category in categories"
        :key="category.category_id"
        as="template"
      >
        <button
          :class="[
            'w-full flex items-center space-x-2  p-2.5 text-sm font-medium rounded-md leading-5',
            ' focus:outline-none',
            isSelected(category.category_id)
              ? 'dark:bg-black/50 dark:text-green-500  bg-[#36C31F]/50 text-green-900 shadow'
              : 'text-slate-500 hover:bg-white/[0.12] hover:text-green-600/90',
          ]"
          @click="selectCategory(category)"
        >
          <CasinoIcons
            :icon-css="'text-gray-950 dark:text-[#36C31F] h-4 w-4'"
            :icon="category.category_name"
          />
          <div>{{ category.category_name }}</div>
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import { useCasinoStore } from "../stores/casino";
import { storeToRefs } from "pinia";
import { useCasinoQueryParamsStore } from "@/stores/casino-query-params";

const { setProviderId, resetToDefaults } = useCasinoQueryParamsStore();

const { selectedCategory } = storeToRefs(useCasinoStore());

const { setSelectedCategory, getAllCasinos, setCategoryIsPending } =
  useCasinoStore();

function isSelected(categoryBinomen) {
  return selectedCategory.value.p_binomen === categoryBinomen;
}

const { providers } = storeToRefs(useCasinoStore());

async function selectCategory(category) {
  resetToDefaults();
  setProviderId(category.p_binomen);
  setSelectedCategory(category);
  setCategoryIsPending(true);
  await getAllCasinos();
  setCategoryIsPending(false);
}
</script>
<template>
  <TabGroup vertical>
    <TabList class="flex flex-col">
      <Tab
        v-for="provider in providers"
        :key="provider.provider_id"
        as="template"
      >
        <button
          :class="[
            'w-full flex items-center space-x-2  p-2.5 text-sm font-medium rounded-md leading-5',
            ' focus:outline-none',
            isSelected(provider.p_binomen)
              ? 'dark:bg-black/50 dark:text-green-500  bg-[#36C31F]/50 text-green-900 shadow'
              : 'text-slate-500 hover:bg-white/[0.12] hover:text-green-600/90',
          ]"
          @click="selectCategory(provider)"
        >
          <CasinoIcons
            :icon-css="'text-gray-700 dark:text-[#36C31F] h-4 w-4 mr-2'"
            :icon="provider.p_binomen"
          />
          {{ provider.provider_name }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
